import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/swiper.css';
import 'swiper/swiper-bundle.css';

const testimonials = [
	{
		text: "Mi perro ahora corre a la puerta cuando llega el mensajero. Sabe que hay premios.",
		author: "Laura P."
	},
	{
		text: "La cama es una nube real. Nunca lo vi dormir tan profundo.",
		author: "Andrés Q."
	},
	{
		text: "Agendé el spa desde el cel. Llegó perfumado y con un pañuelito precioso.",
		author: "Paola G."
	}
];

export default function Testimonials(): React.ReactElement {
	return (
		<section className="w-full max-w-[1120px] mx-auto px-4 py-14" aria-labelledby="tit-test">
			<h2 id="tit-test" className="text-2xl lg:text-3xl xl:text-4xl mb-6 font-extrabold tracking-[0.3px]">
				Humanos felices, colitas moviéndose
			</h2>
			<div className="rounded-[18px] border border-white/[0.06] bg-slate-800 overflow-hidden">
				<Swiper
					modules={[Autoplay, Pagination]}
					autoplay={{
						delay: 4000,
						disableOnInteraction: false,
					}}
					pagination={{
						clickable: true,
						bulletClass: 'w-2.5 h-2.5 rounded-full bg-white/25 cursor-pointer inline-block mx-1',
						bulletActiveClass: 'bg-gradient-to-br from-violet-500 to-cyan-400',
					}}
					loop={true}
					className="testimonials-swiper"
				>
					{testimonials.map((testimonial, index) => (
						<SwiperSlide key={index}>
							<div className="p-8 text-center">
								<blockquote className="text-lg mb-4 italic">
									"{testimonial.text}"
								</blockquote>
								<figcaption className="text-slate-400">
									— {testimonial.author}
								</figcaption>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}
