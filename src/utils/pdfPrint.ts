import jsPDF, { RGBAData } from 'jspdf'
import html2canvas from 'html2canvas'

/** a4纸的尺寸[595.28,841.89], 单位毫米 */
const [PAGE_WIDTH, PAGE_HEIGHT] = [595.28, 841.89]

/** 页边距 */
const MARGIN = 15

/**
 * 将元素转换为canvas
 * @param element 元素
 * @param width 宽度
 * @returns
 */
async function toCanvas(element: HTMLElement, width: number) {
	if (!element) return { width, height: 0 }
	// canvas元素
	const canvas = await html2canvas(element, {
		// 增加清晰度
		scale: window.devicePixelRatio * 2,
		// 允许跨域
		useCORS: true,
		logging: true, // 添加日志以便调试
		windowWidth: element.scrollWidth,
		windowHeight: element.scrollHeight,
		// 确保捕获完整内容
		onclone: (_, element) => {
			element.style.transform = 'none'
			element.style.maxHeight = 'none'
			element.style.overflow = 'visible'
		}
	})
	// 获取canvas转化后的宽高
	const { width: canvasWidth, height: canvasHeight } = canvas
	// html页面生成的canvas在pdf中的高度
	const height = (width / canvasWidth) * canvasHeight
	// 转化成图片Data
	const data = canvas.toDataURL('image/jpeg', 1.0)
	return { width, height, data }
}

/**
 * 生成pdf
 * @param element 元素
 * @param filename 文件名
 * @returns
 */
export async function outputPDF(element: HTMLElement, filename: string) {
	if (element === null || element === undefined || !(element instanceof HTMLElement)) return

	const [A4_WIDTH, A4_HEIGHT] = [PAGE_WIDTH, PAGE_HEIGHT]

	// eslint-disable-next-line new-cap
	const pdf = new jsPDF({
		unit: 'pt',
		format: 'a4',
		orientation: 'portrait'
	})

	const contentWidth = 560

	// 一页的高度， 转换宽度为一页元素的宽度
	const { width, height, data } = await toCanvas(element, contentWidth)

	// 添加
	function addImage(
		_x: number,
		_y: number,
		pdfInstance: jsPDF,
		base_data: string | HTMLImageElement | HTMLCanvasElement | Uint8Array | RGBAData,
		_width: number,
		_height: number
	) {
		pdfInstance.addImage(base_data, 'JPEG', _x, _y, _width, _height)
	}

	const baseX = (A4_WIDTH - contentWidth) / 2
	// 距离PDF 页眉和页脚的间距， 留白留空
	const baseY = MARGIN
	// 除去页头、页眉、还有内容与两者之间的间距后 每页内容的实际高度
	const originalPageHeight = A4_HEIGHT - MARGIN * 2
	// 元素在网页页面的宽度
	const elementWidth = (element.offsetWidth - 24) / 2

	// PDF内容宽度 和 在HTML中宽度 的比， 用于将 元素在网页的高度 转化为 PDF内容内的高度， 将 元素距离网页顶部的高度  转化为 距离Canvas顶部的高度
	const rate = contentWidth / elementWidth

	// 每一页的分页坐标， PDF高度， 初始值为根元素距离顶部的距离
	const pages = [rate * getElementTop(element)!]

	// 获取该元素到页面顶部的高度(注意滑动scroll会影响高度)
	function getElementTop(contentElement: HTMLElement) {
		if (contentElement.getBoundingClientRect) {
			const rect = contentElement.getBoundingClientRect() || {}
			const topDistance = rect.top
			return topDistance
		}
	}

	// 遍历正常的元素节点
	function traversingNodes(nodes: any) {
		for (const element of nodes) {
			const one = element
			// 计算出最终高度
			const offsetTop = getElementTop(one)
			// dom转换后距离顶部的高度,转换成canvas高度
			const top = rate * offsetTop!
			// 对于普通元素，则判断是否高度超过分页值，并且深入
			// 执行位置更新操作
			updateNormalElPos(top)
			updatePos()
		}
	}
	// 增加空白遮挡
	function addBlank(x: number, y: number, _width: number, _height: number) {
		pdf.setFillColor(255, 255, 255)
		pdf.rect(x, y, Math.ceil(_width), Math.ceil(_height), 'F')
	}

	// 普通元素更新位置的方法
	// 普通元素只需要考虑到是否到达了分页点，即当前距离顶部高度 - 上一个分页点的高度 大于 正常一页的高度，则需要载入分页点
	function updateNormalElPos(top: number) {
		if (top - (pages.length > 0 ? pages[pages.length - 1] : 0) >= originalPageHeight) {
			pages.push((pages.length > 0 ? pages[pages.length - 1] : 0) + originalPageHeight)
		}
	}
	const childNodes = element.querySelectorAll('.pdf-element')
	// 深度遍历节点的方法
	traversingNodes(childNodes)

	function updatePos() {
		while (pages[pages.length - 1] + originalPageHeight < height) {
			pages.push(pages[pages.length - 1] + originalPageHeight)
		}
	}

	// 对pages进行一个值的修正，因为pages生成是根据根元素来的，根元素并不是我们实际要打印的元素，而是element，
	// 所以要把它修正，让其值是以真实的打印元素顶部节点为准
	const newPages = pages.map((item) => item - pages[0])

	// 根据分页位置 开始分页
	for (let i = 0; i < newPages.length; ++i) {
		// 根据分页位置新增图片
		addImage(baseX, baseY - newPages[i], pdf, data!, width, height)

		// 将 内容 与 页眉之间留空留白的部分进行遮白处理
		addBlank(0, 0, A4_WIDTH, baseY)
		// 将 内容 与 页脚之间留空留白的部分进行遮白处理
		addBlank(0, A4_HEIGHT - baseY, A4_WIDTH, baseY)
		// 对于除最后一页外，对 内容 的多余部分进行遮白处理
		if (i < newPages.length - 1) {
			// 获取当前页面需要的内容部分高度
			const imageHeight = newPages[i + 1] - newPages[i]
			// 对多余的内容部分进行遮白
			addBlank(0, baseY + imageHeight, A4_WIDTH, A4_HEIGHT - imageHeight)
		}

		// 若不是最后一页，则分页
		if (i !== newPages.length - 1) {
			// 增加分页
			pdf.addPage()
		}
	}
	return pdf.save(filename)
}
