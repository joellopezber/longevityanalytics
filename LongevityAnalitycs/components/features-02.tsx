import Image from 'next/image'
import FeatureImage01 from '@/public/images/feature-post-01.png'
import FeatureImage02 from '@/public/images/feature-post-02.png'
import FeatureImage03 from '@/public/images/feature-post-03.png'
import FeatureImage04 from '@/public/images/feature-post-04.png'
import FeatureImage05 from '@/public/images/feature-post-05.png'

export default function Features02() {
  return (
    <section>
      <div className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="relative max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="font-inter-tight text-3xl md:text-4xl font-bold text-zinc-900 mb-4">AI-powered features and effects</h2>
            <p className="text-lg text-zinc-500">Whenever you are ready, just hit publish to turn your site sketches into an actual designs. No creating, no skills, no reshaping.</p>
          </div>
          <div className="max-w-xs mx-auto sm:max-w-none grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-4 lg:gap-8">
            <article className="sm:col-span-2 flex flex-col border border-transparent [background:linear-gradient(var(--color-white),var(--color-zinc-50))_padding-box,linear-gradient(120deg,var(--color-zinc-300),var(--color-zinc-100),var(--color-zinc-300))_border-box] rounded-lg">
              <div className="grow flex flex-col p-5 pt-6">
                <div className="flex items-center space-x-3 mb-1">
                  <svg className="inline-flex fill-zinc-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                    <path d="M17 9c.6 0 1 .4 1 1v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h6c.6 0 1 .4 1 1s-.4 1-1 1H4v12h12v-6c0-.6.4-1 1-1Zm-.7-6.7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-8 8c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l8-8Z" />
                  </svg>
                  <h3 className="font-inter-tight font-semibold text-zinc-900">Truly Collaborative</h3>
                </div>
                <p className="grow max-w-md text-sm text-zinc-500">Create teams and organize your designs into folders using project specs and insights.</p>
              </div>
              <figure>
                <Image className="h-[280px] object-cover object-left mx-auto sm:object-contain sm:h-auto" src={FeatureImage01} width={721} height={280} alt="Feature Post 01" />
              </figure>
            </article>
            <article className="flex flex-col border border-transparent [background:linear-gradient(var(--color-white),var(--color-zinc-50))_padding-box,linear-gradient(120deg,var(--color-zinc-300),var(--color-zinc-100),var(--color-zinc-300))_border-box] rounded-lg">
              <div className="grow flex flex-col p-5 pt-6">
                <div className="flex items-center space-x-3 mb-1">
                  <svg className="inline-flex fill-zinc-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                    <path d="m6.035 17.335-4-14c-.2-.8.5-1.5 1.3-1.3l14 4c.9.3 1 1.5.1 1.9l-6.6 2.9-2.8 6.6c-.5.9-1.7.8-2-.1Zm-1.5-12.8 2.7 9.5 1.9-4.4c.1-.2.3-.4.5-.5l4.4-1.9-9.5-2.7Z" />
                  </svg>
                  <h3 className="font-inter-tight font-semibold text-zinc-900">Advanced AI</h3>
                </div>
                <p className="grow max-w-md text-sm text-zinc-500">Generate images and explore new ways of presenting your designs with AI.</p>
              </div>
              <figure>
                <Image className="h-[280px] object-cover object-left mx-auto sm:object-contain sm:h-auto" src={FeatureImage02} width={342} height={280} alt="Feature Post 02" />
              </figure>
            </article>
            <article className="flex flex-col border border-transparent [background:linear-gradient(var(--color-white),var(--color-zinc-50))_padding-box,linear-gradient(120deg,var(--color-zinc-300),var(--color-zinc-100),var(--color-zinc-300))_border-box] rounded-lg">
              <div className="grow flex flex-col p-5 pt-6">
                <div className="flex items-center space-x-3 mb-1">
                  <svg className="inline-flex fill-zinc-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                    <path d="M8.974 16c-.3 0-.7-.2-.9-.5l-2.2-3.7-2.1 2.8c-.3.4-1 .5-1.4.2-.4-.3-.5-1-.2-1.4l3-4c.2-.3.5-.4.9-.4.3 0 .6.2.8.5l2 3.3 3.3-8.1c0-.4.4-.7.8-.7s.8.2.9.6l4 8c.2.5 0 1.1-.4 1.3-.5.2-1.1 0-1.3-.4l-3-6-3.2 7.9c-.2.4-.6.6-1 .6Z" />
                  </svg>
                  <h3 className="font-inter-tight font-semibold text-zinc-900">Simple Snippets</h3>
                </div>
                <p className="grow max-w-md text-sm text-zinc-500">Get your scenes inside your projects using simple embed code/snippets.</p>
              </div>
              <figure>
                <Image className="h-[280px] object-cover object-left mx-auto sm:object-contain sm:h-auto" src={FeatureImage03} width={342} height={280} alt="Feature Post 03" />
              </figure>
            </article>
            <article className="flex flex-col border border-transparent [background:linear-gradient(var(--color-white),var(--color-zinc-50))_padding-box,linear-gradient(120deg,var(--color-zinc-300),var(--color-zinc-100),var(--color-zinc-300))_border-box] rounded-lg">
              <div className="grow flex flex-col p-5 pt-6">
                <div className="flex items-center space-x-3 mb-1">
                  <svg className="inline-flex fill-zinc-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                    <path d="M9.3 11.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0ZM9.3 17.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0ZM2.3 12.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0Z" />
                  </svg>
                  <h3 className="font-inter-tight font-semibold text-zinc-900">Precise Activity</h3>
                </div>
                <p className="grow max-w-md text-sm text-zinc-500">Easily make drag and drop interactions without coding.</p>
              </div>
              <figure>
                <Image className="h-[280px] object-cover object-left mx-auto sm:object-contain sm:h-auto" src={FeatureImage04} width={342} height={280} alt="Feature Post 04" />
              </figure>
            </article>
            <article className="flex flex-col border border-transparent [background:linear-gradient(var(--color-white),var(--color-zinc-50))_padding-box,linear-gradient(120deg,var(--color-zinc-300),var(--color-zinc-100),var(--color-zinc-300))_border-box] rounded-lg">
              <div className="grow flex flex-col p-5 pt-6">
                <div className="flex items-center space-x-3 mb-1">
                  <svg className="inline-flex fill-zinc-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                    <path d="M16 2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h8.667l3.733 2.8A1 1 0 0 0 18 17V4a2 2 0 0 0-2-2Zm0 13-2.4-1.8a1 1 0 0 0-.6-.2H4V4h12v11Z" />
                  </svg>
                  <h3 className="font-inter-tight font-semibold text-zinc-900">Real-time Feedback</h3>
                </div>
                <p className="grow max-w-md text-sm text-zinc-500">Create tasks, projects, issues and more in just seconds.</p>
              </div>
              <figure>
                <Image className="h-[280px] object-cover object-left mx-auto sm:object-contain sm:h-auto" src={FeatureImage05} width={342} height={280} alt="Feature Post 05" />
              </figure>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}