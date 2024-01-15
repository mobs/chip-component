import Image from 'next/image'
import { Inter } from 'next/font/google'
import Chip from '@/components/Chip'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Chip />
    </div>
  )
}
