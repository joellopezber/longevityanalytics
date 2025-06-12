import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/public/images/logo.png'

export default function Footer() {
  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 py-8 md:py-12 border-t border-zinc-200">
          {/* Logo */}
          <Link className="flex items-center justify-center bg-white w-8 h-8 rounded-sm shadow-xs shadow-zinc-950/20" href="/">
            <Image src={Logo} width={24} height={24} alt="Logo" />
          </Link>
          {/* Derechos reservados */}
          <div className="text-sm text-zinc-500 md:mx-4 text-center md:text-left">
            © 2024 Longevity Analytics. Todos los derechos reservados.
          </div>
          {/* Enlaces básicos */}
          <ul className="flex flex-row gap-4 text-sm text-zinc-500">
            <li>
              <Link href="/contacto" className="hover:text-zinc-900 transition">Contacto</Link>
            </li>
            <li>
              <Link href="/aviso-legal" className="hover:text-zinc-900 transition">Aviso legal</Link>
            </li>
            <li>
              <Link href="/privacidad" className="hover:text-zinc-900 transition">Política de privacidad</Link>
            </li>
            <li>
              <Link href="/terminos" className="hover:text-zinc-900 transition">Términos y condiciones</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
