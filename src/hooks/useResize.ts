/**
 * 监听窗口大小变化
 * @returns 
 */
export function useResize() {
  const windowHeight = ref(window.innerHeight)
  const windowWidth = ref(window.innerWidth)

  const handleResize = ()=>{
    windowHeight.value = window.innerHeight
    windowWidth.value = window.innerWidth
  }

  onMounted(()=>{})
    window.addEventListener('resize', handleResize)

  onUnmounted(()=>{
    window.removeEventListener('resize', handleResize)
  })

	return {
    windowWidth,
    windowHeight
	}
}
