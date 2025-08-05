import { MoveRight } from "lucide-react";

const teachingCases = [
  {
    id: 1,
    school: "Teacher Toolkit",
    tag: "AI IN TEACHING / PROMPT ENGINEERING",
    title: "Smart Prompt Design",
    subtitle:
      "From Lesson Planning to Student Engagement: How AI Prompting Saves 5 Hours Per Week",
    image: "/prompt.png",
    href: "/course/LLMTeachingGuide",
  },
  {
    id: 2,
    school: "Teacher Toolkit",
    tag: "MATHEMATICS / YEAR 8",
    title: "Hands-On Math Success",
    subtitle:
      "Making Abstract Math Concrete: Students Master Ratios Through Real-World Mapping",
    image: "/math.png",
    href: "/course/RatioShapesShowCase",
  },
];

const TeachingCasePreview = () => {
  return (
    <section className='py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      <div className='container mx-auto px-6'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold mb-4 text-gray-800'>
            Teaching Success Stories
          </h2>
          <p className='text-xl text-gray-600'>
            See how educators like you are transforming their classrooms with
            innovative approaches
          </p>
        </div>

        <div className='space-y-8'>
          {teachingCases.map((item) => (
            <div
              key={item.id}
              className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300'
            >
              <a
                href={item.href}
                className='group grid gap-4 overflow-hidden transition-colors duration-500 ease-out hover:bg-muted/40 lg:grid-cols-2'
              >
                <div className='flex flex-col justify-between gap-4 p-8'>
                  <div className='flex items-center gap-2 text-2xl font-medium text-gray-800'>
                    {item.school}
                  </div>
                  <div>
                    <span className='text-sm text-gray-500'>{item.tag}</span>
                    <h2 className='mt-4 mb-2 text-2xl font-semibold text-gray-800 sm:text-3xl sm:leading-10'>
                      {item.title}
                    </h2>
                    <p className='mb-5 text-lg font-medium text-gray-600 transition-colors duration-500 ease-out group-hover:text-gray-800'>
                      {item.subtitle}
                    </p>
                    <div className='flex items-center gap-2 font-medium text-teal-600 group-hover:text-teal-700'>
                      See How They Did It
                      <MoveRight className='h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-1' />
                    </div>
                  </div>
                </div>
                <div className='relative isolate p-8'>
                  <div className='relative isolate h-full rounded-lg overflow-hidden'>
                    <img
                      src={item.image}
                      alt={item.title}
                      className='aspect-[14/9] h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105'
                    />
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeachingCasePreview;
