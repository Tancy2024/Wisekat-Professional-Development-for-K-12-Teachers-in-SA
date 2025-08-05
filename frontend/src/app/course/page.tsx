import React from "react";
import TeachingCasePreview from "../components/TeachingCasePreview";
import Header from "../components/Header";
import { Download } from "lucide-react";

const CoursePage = () => {
  return (
    <main className='min-h-screen bg-white'>
      <Header />
      <TeachingCasePreview />

      <section className='max-w-6xl mx-auto px-6 py-20'>
        <h2 className='text-3xl font-bold mb-12 text-gray-800 text-center'>
          Supplementary Teaching Slide
        </h2>

        <div className='mt-12'>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 0,
              paddingTop: "56.2500%",
              paddingBottom: 0,
              boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)",
              marginTop: "1.6em",
              marginBottom: "0.9em",
              overflow: "hidden",
              borderRadius: "8px",
              willChange: "transform",
            }}
          >
            <iframe
              loading='lazy'
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                border: "none",
                padding: 0,
                margin: 0,
              }}
              src='https://www.canva.com/design/DAGo5NsdM3I/HOn_QCGtXZ-4z10jXtT3SQ/view?embed'
              allowFullScreen={true}
              allow='fullscreen'
            ></iframe>
          </div>
          <div className='text-center mt-4'>
            <a
              href='https://www.canva.com/design/DAGo5NsdM3I/HOn_QCGtXZ-4z10jXtT3SQ/view'
              target='_blank'
              rel='noopener noreferrer'
              className='text-teal-600 hover:text-teal-700 font-medium'
            >
              Responsible AI for Teachers
            </a>
            <span className='text-gray-600 ml-2'>by Harry song</span>
          </div>
          <div className='text-center mt-6'>
            <a
              href='/Responsible AI for Teachers.pdf'
              download
              className='inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm'
            >
              <Download className='w-5 h-5' />
              Download
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CoursePage;
