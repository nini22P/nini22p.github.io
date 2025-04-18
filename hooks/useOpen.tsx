import { useRouter } from 'next/navigation'

const useOpen = () => {

  const router = useRouter()

  const open = ({ path, url }: { path?: string | undefined, url?: string | undefined }) => {
    if (path) router.push(path)
    if (url) window.open(url, '_blank')
  }

  return {
    open
  }
}

export default useOpen