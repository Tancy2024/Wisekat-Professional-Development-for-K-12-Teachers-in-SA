"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import {
  BookOpen,
  Target,
  Users,
  PenTool,
  Brain,
  Activity,
  BarChart3,
  Layers,
  Globe,
  Monitor,
  CheckCircle,
  XCircle,
  Lightbulb,
  ArrowRight,
  Star,
  Zap,
} from "lucide-react";

interface PromptExampleProps {
  type: "effective" | "ineffective";
  content: string;
  analysis: string;
}

interface SectionExample {
  effective: {
    content: string;
    analysis: string;
  };
  ineffective: {
    content: string;
    analysis: string;
  };
}

interface SectionExamples {
  [key: number]: SectionExample;
}

const LLMTeachingGuide = () => {
  const [activeSection, setActiveSection] = useState(1);

  const sections = [
    {
      id: 1,
      title: "Using Data to Inform Teaching Goals",
      icon: <Target className='w-5 h-5' />,
      description:
        "Transform assessment data into targeted learning objectives",
      category: "Planning",
    },
    {
      id: 2,
      title: "Designing Engaging Warm-Up Activities",
      icon: <Zap className='w-5 h-5' />,
      description:
        "Create focused 5-minute activities that bridge prior knowledge",
      category: "Activities",
    },
    {
      id: 3,
      title: "Creating Structured Learning Activities",
      icon: <PenTool className='w-5 h-5' />,
      description: "Design comprehensive activities with clear objectives",
      category: "Activities",
    },
    {
      id: 4,
      title: "Incorporating AI for Student Feedback",
      icon: <Brain className='w-5 h-5' />,
      description: "Leverage AI tools for personalized student feedback",
      category: "Technology",
    },
    {
      id: 5,
      title: "Hands-On Exploration Activities",
      icon: <Activity className='w-5 h-5' />,
      description: "Physical manipulatives meet digital discovery",
      category: "Activities",
    },
    {
      id: 6,
      title: "Meaningful Conclusion & Reflection",
      icon: <Lightbulb className='w-5 h-5' />,
      description: "Guide students to synthesize and discover principles",
      category: "Reflection",
    },
    {
      id: 7,
      title: "Comprehensive Assessment Strategies",
      icon: <BarChart3 className='w-5 h-5' />,
      description: "Balance formative and summative assessment approaches",
      category: "Assessment",
    },
    {
      id: 8,
      title: "Creating Differentiated Problem Sets",
      icon: <Layers className='w-5 h-5' />,
      description: "Multi-level problems for diverse learning needs",
      category: "Differentiation",
    },
    {
      id: 9,
      title: "Planning Cross-Curricular Connections",
      icon: <Globe className='w-5 h-5' />,
      description: "Integrate subjects for deeper understanding",
      category: "Integration",
    },
    {
      id: 10,
      title: "Developing Digital Learning Resources",
      icon: <Monitor className='w-5 h-5' />,
      description: "Interactive digital worksheets and self-assessment tools",
      category: "Technology",
    },
  ];

  const principles = [
    "Be specific about student context",
    "Provide clear parameters",
    "Connect to curriculum and assessment",
    "Request thoughtful integration",
    "Seek multi-dimensional resources",
  ];

  const categories = [
    "All",
    "Planning",
    "Activities",
    "Technology",
    "Assessment",
    "Differentiation",
    "Integration",
    "Reflection",
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSections =
    selectedCategory === "All"
      ? sections
      : sections.filter((section) => section.category === selectedCategory);

  const sectionExamples: SectionExamples = {
    1: {
      effective: {
        content:
          "I'm a Year 8 mathematics teacher in Australia. Based on my students' recent assessment results [65% error rate when applying scale to calculate actual dimensions] and classwork observations [students confuse the relationship between side length ratios and area ratios], I need to set three targeted goals for our next lesson on ratio and similar shapes. Please provide clear goals, rationales based on the data, and teaching strategies aligned with the Australian Curriculum.",
        analysis:
          "Includes specific assessment data, identifies particular student difficulties, specifies year level, and requests curriculum alignment.",
      },
      ineffective: {
        content:
          "My students are having difficulties with similar shapes. What teaching goals should I set?",
        analysis:
          "Lacks context, specific learning challenges, and clear parameters for the response.",
      },
    },
    2: {
      effective: {
        content:
          "I need a 5-minute warm-up activity for my Year 7 class that reviews the concept of ratios using real-world examples. The activity should be engaging, require minimal setup, and help students connect their prior knowledge of fractions to the concept of ratios. Please include specific examples and questions to prompt student thinking.",
        analysis:
          "Specifies duration, grade level, learning objective, and requests concrete examples and questions.",
      },
      ineffective: {
        content: "Can you give me a warm-up activity for ratios?",
        analysis:
          "Too vague, lacks context about grade level, duration, and specific learning objectives.",
      },
    },
    3: {
      effective: {
        content:
          "Design a 30-minute structured activity for teaching similar triangles to Year 9 students. Include: 1) A clear learning objective aligned with the Australian Curriculum, 2) Step-by-step instructions with time allocations, 3) Required materials, 4) Assessment criteria, and 5) Differentiation strategies for students with varying abilities.",
        analysis:
          "Provides comprehensive parameters, clear structure, and specific requirements for the activity.",
      },
      ineffective: {
        content: "How can I teach similar triangles?",
        analysis:
          "Lacks structure, timing, and specific requirements for the lesson.",
      },
    },
    4: {
      effective: {
        content:
          "Create a rubric for providing AI-generated feedback on student work about ratio problems. The rubric should: 1) Focus on mathematical reasoning and problem-solving steps, 2) Include specific criteria for different achievement levels, 3) Provide examples of effective feedback, and 4) Consider how to maintain a supportive tone while addressing misconceptions.",
        analysis:
          "Specifies the purpose, structure, and key elements needed for effective AI feedback.",
      },
      ineffective: {
        content: "How can I use AI to give feedback?",
        analysis:
          "Too general, lacks specific requirements and structure for the feedback system.",
      },
    },
    5: {
      effective: {
        content:
          "Design a hands-on exploration activity for Year 6 students to discover the relationship between scale factors and area in similar shapes. Include: 1) A list of required manipulatives, 2) Step-by-step exploration tasks, 3) Guiding questions to prompt discovery, and 4) A worksheet template for recording observations.",
        analysis:
          "Provides clear structure, materials list, and specific learning objectives for the exploration.",
      },
      ineffective: {
        content: "What's a good hands-on activity for similar shapes?",
        analysis:
          "Lacks specific details about materials, structure, and learning objectives.",
      },
    },
    6: {
      effective: {
        content:
          "Create a reflection framework for students to analyze their learning about ratios and proportions. Include: 1) Specific questions about their problem-solving process, 2) Prompts for connecting concepts to real-world applications, 3) Space for identifying areas of growth, and 4) A self-assessment component.",
        analysis:
          "Provides structured reflection prompts and clear components for the reflection process.",
      },
      ineffective: {
        content: "How can students reflect on what they learned?",
        analysis:
          "Too general, lacks specific structure and components for meaningful reflection.",
      },
    },
    7: {
      effective: {
        content:
          "Design a comprehensive assessment strategy for a unit on ratios and proportions. Include: 1) Formative assessment tools for each lesson, 2) A summative assessment with clear rubrics, 3) Self-assessment components, and 4) Specific criteria for evaluating different aspects of student understanding.",
        analysis:
          "Provides a complete assessment framework with multiple components and clear evaluation criteria.",
      },
      ineffective: {
        content: "What assessments should I use for ratios?",
        analysis:
          "Too vague, lacks specific assessment types and evaluation criteria.",
      },
    },
    8: {
      effective: {
        content:
          "Create three levels of problem sets for teaching similar triangles: 1) Basic problems focusing on identifying similar triangles, 2) Intermediate problems requiring scale factor calculations, and 3) Advanced problems involving real-world applications. Include answer keys and solution strategies for each level.",
        analysis:
          "Provides clear differentiation levels, specific problem types, and comprehensive support materials.",
      },
      ineffective: {
        content: "Can you give me some problems for similar triangles?",
        analysis:
          "Lacks differentiation, specific problem types, and support materials.",
      },
    },
    9: {
      effective: {
        content:
          "Design a cross-curricular project connecting ratios and proportions to science and art. Include: 1) Specific learning objectives from each subject area, 2) A project timeline, 3) Required materials, 4) Assessment criteria, and 5) Examples of how concepts connect across subjects.",
        analysis:
          "Provides clear connections between subjects, specific requirements, and assessment criteria.",
      },
      ineffective: {
        content: "How can I connect ratios to other subjects?",
        analysis:
          "Too general, lacks specific connections and implementation details.",
      },
    },
    10: {
      effective: {
        content:
          "Create a digital worksheet template for practicing ratio problems. Include: 1) Interactive elements for solving problems, 2) Immediate feedback mechanisms, 3) Progress tracking features, 4) Different difficulty levels, and 5) A self-assessment component.",
        analysis:
          "Specifies interactive features, assessment components, and differentiation options.",
      },
      ineffective: {
        content: "Can you make a digital worksheet for ratios?",
        analysis:
          "Too vague, lacks specific features and components for the digital resource.",
      },
    },
  };

  const PromptExample = ({ type, content, analysis }: PromptExampleProps) => (
    <div
      className={`p-4 rounded-lg border-l-4 ${
        type === "effective"
          ? "border-green-500 bg-green-50"
          : "border-red-500 bg-red-50"
      }`}
    >
      <div className='flex items-center gap-2 mb-2'>
        {type === "effective" ? (
          <CheckCircle className='w-4 h-4 text-green-600' />
        ) : (
          <XCircle className='w-4 h-4 text-red-600' />
        )}
        <h4
          className={`font-semibold ${
            type === "effective" ? "text-green-800" : "text-red-800"
          }`}
        >
          {type === "effective" ? "Effective Prompt" : "Ineffective Prompt"}
        </h4>
      </div>
      <p className='text-sm text-gray-700 mb-3 italic leading-relaxed'>
        &quot;{content}&quot;
      </p>
      {analysis && (
        <div className='text-xs text-gray-600 bg-white p-2 rounded'>
          <strong>Analysis:</strong> {analysis}
        </div>
      )}
    </div>
  );

  return (
    <>
      <Header />
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
        {/* Hero Section */}
        <div className='bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white'>
          <div className='container mx-auto px-6 py-16'>
            <div className='max-w-4xl mx-auto text-center'>
              <div className='flex justify-center mb-6'>
                <div className='p-3 bg-white/20 rounded-full'>
                  <BookOpen className='w-12 h-12' />
                </div>
              </div>
              <h1 className='text-4xl md:text-6xl font-bold mb-6 leading-tight'>
                Guide to Using Large Language Models in Teaching
              </h1>
              <p className='text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed'>
                Principles for Effective Prompting to Enhance Your Teaching
                Practice
              </p>
              <div className='flex flex-wrap justify-center gap-4 mb-8'>
                <Badge
                  variant='secondary'
                  className='px-4 py-2 text-sm bg-white/20 text-white border-white/30'
                >
                  <Target className='w-4 h-4 mr-2' />
                  Data-Driven Goals
                </Badge>
                <Badge
                  variant='secondary'
                  className='px-4 py-2 text-sm bg-white/20 text-white border-white/30'
                >
                  <Users className='w-4 h-4 mr-2' />
                  Differentiated Learning
                </Badge>
                <Badge
                  variant='secondary'
                  className='px-4 py-2 text-sm bg-white/20 text-white border-white/30'
                >
                  <Brain className='w-4 h-4 mr-2' />
                  AI Integration
                </Badge>
              </div>
              <p className='text-lg text-blue-100 max-w-3xl mx-auto'>
                This comprehensive guide demonstrates how to craft effective
                prompts for Large Language Models to enhance your teaching
                through practical examples using ratio and similar shapes.
              </p>
            </div>
          </div>
        </div>

        <div className='container mx-auto px-6 py-12'>
          {/* Overview Cards */}
          <div className='grid md:grid-cols-3 gap-6 mb-12'>
            <Card className='border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50'>
              <CardContent className='p-6 text-center'>
                <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Star className='w-6 h-6 text-green-600' />
                </div>
                <h3 className='font-semibold text-lg mb-2 text-green-800'>
                  10 Core Strategies
                </h3>
                <p className='text-green-700 text-sm'>
                  Comprehensive techniques covering all aspects of LLM-enhanced
                  teaching
                </p>
              </CardContent>
            </Card>

            <Card className='border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50'>
              <CardContent className='p-6 text-center'>
                <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <CheckCircle className='w-6 h-6 text-blue-600' />
                </div>
                <h3 className='font-semibold text-lg mb-2 text-blue-800'>
                  Practical Examples
                </h3>
                <p className='text-blue-700 text-sm'>
                  Real classroom scenarios with effective vs. ineffective prompt
                  comparisons
                </p>
              </CardContent>
            </Card>

            <Card className='border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50'>
              <CardContent className='p-6 text-center'>
                <div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Globe className='w-6 h-6 text-purple-600' />
                </div>
                <h3 className='font-semibold text-lg mb-2 text-purple-800'>
                  Cross-Curricular
                </h3>
                <p className='text-purple-700 text-sm'>
                  Adaptable principles for mathematics, science, English, and
                  beyond
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Category Filter */}
          <div className='mb-8'>
            <div className='flex flex-wrap gap-2 justify-center'>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size='sm'
                  onClick={() => setSelectedCategory(category)}
                  className='rounded-full'
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Sections Grid */}
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
            {filteredSections.map((section) => (
              <Card
                key={section.id}
                className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1'
                onClick={() => setActiveSection(section.id)}
              >
                <CardHeader className='pb-3'>
                  <div className='flex items-center gap-3 mb-2'>
                    <div className='p-2 bg-blue-100 rounded-lg'>
                      {section.icon}
                    </div>
                    <Badge variant='secondary' className='text-xs'>
                      {section.category}
                    </Badge>
                  </div>
                  <CardTitle className='text-lg leading-tight'>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className='pt-0'>
                  <CardDescription className='text-sm leading-relaxed'>
                    {section.description}
                  </CardDescription>
                  <div className='flex items-center text-blue-600 text-sm mt-3'>
                    <span>Explore examples</span>
                    <ArrowRight className='w-4 h-4 ml-1' />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Example Section */}
          <Card className='border-0 shadow-lg mb-12'>
            <CardHeader>
              <CardTitle className='flex items-center gap-3 text-2xl'>
                <div className='p-2 bg-blue-100 rounded-lg'>
                  {sections.find((s) => s.id === activeSection)?.icon}
                </div>
                {sections.find((s) => s.id === activeSection)?.title}
              </CardTitle>
              <CardDescription className='text-lg'>
                {sections.find((s) => s.id === activeSection)?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue='examples' className='w-full'>
                <TabsList className='grid w-full grid-cols-2'>
                  <TabsTrigger value='examples'>Prompt Examples</TabsTrigger>
                  <TabsTrigger value='analysis'>Key Principles</TabsTrigger>
                </TabsList>

                <TabsContent value='examples' className='space-y-6 mt-6'>
                  <PromptExample
                    type='effective'
                    content={sectionExamples[activeSection]?.effective.content}
                    analysis={
                      sectionExamples[activeSection]?.effective.analysis
                    }
                  />

                  <PromptExample
                    type='ineffective'
                    content={
                      sectionExamples[activeSection]?.ineffective.content
                    }
                    analysis={
                      sectionExamples[activeSection]?.ineffective.analysis
                    }
                  />
                </TabsContent>

                <TabsContent value='analysis' className='mt-6'>
                  <div className='grid md:grid-cols-2 gap-6'>
                    <div>
                      <h4 className='font-semibold mb-3 text-green-800'>
                        What Makes It Effective
                      </h4>
                      <ul className='space-y-2 text-sm'>
                        <li className='flex items-start gap-2'>
                          <CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
                          <span>Specific assessment data and observations</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
                          <span>
                            Clear identification of student difficulties
                          </span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
                          <span>
                            Year level and curriculum context provided
                          </span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
                          <span>Request for standards alignment</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className='font-semibold mb-3 text-red-800'>
                        What&apos;s Missing in Ineffective
                      </h4>
                      <ul className='space-y-2 text-sm'>
                        <li className='flex items-start gap-2'>
                          <XCircle className='w-4 h-4 text-red-600 mt-0.5 flex-shrink-0' />
                          <span>No specific context about students</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <XCircle className='w-4 h-4 text-red-600 mt-0.5 flex-shrink-0' />
                          <span>Vague description of difficulties</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <XCircle className='w-4 h-4 text-red-600 mt-0.5 flex-shrink-0' />
                          <span>No year level or curriculum reference</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <XCircle className='w-4 h-4 text-red-600 mt-0.5 flex-shrink-0' />
                          <span>No clear parameters for response</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* General Principles */}
          <Card className='border-0 shadow-lg'>
            <CardHeader>
              <CardTitle className='text-2xl flex items-center gap-3'>
                <Lightbulb className='w-8 h-8 text-yellow-600' />
                General Principles for Effective LLM Prompting
              </CardTitle>
              <CardDescription>
                Apply these core principles across all subject areas for optimal
                results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {principles.map((principle, index) => (
                  <div
                    key={index}
                    className='p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg'
                  >
                    <div className='flex items-center gap-2 mb-2'>
                      <div className='w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold'>
                        {index + 1}
                      </div>
                      <h4 className='font-semibold text-blue-800'>
                        {principle}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LLMTeachingGuide;
