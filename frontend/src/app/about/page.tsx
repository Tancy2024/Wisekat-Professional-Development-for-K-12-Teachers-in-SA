import React from "react";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { TeamSection } from "../components/TeamSection";

export default function AboutPage() {
  return (
    <div>
      <Header />
      <section className='py-32 flex justify-center'>
        <div className='container flex flex-col gap-28'>
          <div className='flex flex-col gap-7'>
            <h1 className='text-4xl font-semibold lg:text-7xl'>
              Bringing the power of AI to teachers
            </h1>
            <p className='max-w-xl text-lg'>
              WiseKat makes it easy for teachers to use AI in their classrooms.
            </p>
          </div>
          <div className='grid gap-6 md:grid-cols-2'>
            <img
              src='/green.jpg'
              alt='placeholder'
              className='size-full max-h-96 rounded-2xl object-cover'
            />
            <div className='flex flex-col justify-between gap-10 rounded-2xl bg-muted p-10'>
              <p className='text-sm text-muted-foreground'>OUR MISSION</p>
              <p className='text-lg font-medium'>
                We believe that AI can help teachers do their jobs better, and
                we want to make it possible for teachers to understand and use
                AI to enpower education.
              </p>
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='max-w-xl'>
              <h2 className='mb-2.5 text-3xl font-semibold md:text-5xl'>
                AI Empowering Education
              </h2>
              <p className='pt-3 text-justify w-4xl md:w-3xl text-2xl'>
                In today&apos;s rapidly evolving educational environment,
                teachers face unprecedented challenges and opportunities. Our AI
                education tools are designed to be teachers&apos; most reliable
                assistants, providing them with innovative solutions to make the
                teaching and learning process more efficient, personalised and
                dynamic. We believe that AI is not meant to replace teachers,
                but to empower them to teach. Our AI tools enable teachers to
                devote more time and energy to what matters most - interacting
                with and guiding students. Explore the beautiful fusion of AI
                and education and start a new chapter in teaching together!
              </p>
            </div>
            <div className='grid gap-10 md:grid-cols-3'></div>
          </div>
          <div>
            <TeamSection />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
