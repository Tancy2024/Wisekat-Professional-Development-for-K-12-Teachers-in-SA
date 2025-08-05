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
  MapPin,
  Camera,
  Ruler,
  Calculator,
  Triangle,
  Square,
  Zap,
  CheckCircle,
  MessageSquare,
  FileText,
  Video,
  Image,
  Globe,
} from "lucide-react";

const RatioShapesShowcase = () => {
  const [activeSection, setActiveSection] = useState(0);

  const learningObjectives = {
    knowledge: [
      {
        title: "Scale Concept Mastery",
        description:
          "Accurately read map scales, calculate actual distances, and understand real-world applications",
        icon: <Ruler className='w-5 h-5' />,
      },
      {
        title: "Similar Shapes Understanding",
        description:
          "Identify and create enlarged/reduced drawings, understand proportional properties",
        icon: <Triangle className='w-5 h-5' />,
      },
      {
        title: "Digital Tool Proficiency",
        description:
          "Explore mathematical concepts using digital tools and AI technology",
        icon: <Brain className='w-5 h-5' />,
      },
      {
        title: "Research & Analysis Skills",
        description:
          "Effectively search, organize, and analyze mathematical information",
        icon: <FileText className='w-5 h-5' />,
      },
      {
        title: "Presentation Skills",
        description:
          "Create clear reports and deliver confident oral presentations",
        icon: <MessageSquare className='w-5 h-5' />,
      },
    ],
    process: [
      {
        title: "Self-Directed Learning",
        description:
          "Actively question, explore, verify, and reflect on mathematical concepts",
        icon: <Target className='w-5 h-5' />,
      },
      {
        title: "Collaborative Learning",
        description:
          "Participate in group discussions, share ideas, and demonstrate communication skills",
        icon: <Users className='w-5 h-5' />,
      },
      {
        title: "Multimedia Expression",
        description:
          "Use text, images, audio, and other media to create and express mathematical ideas",
        icon: <Image className='w-5 h-5' />,
      },
    ],
  };

  const sections = [
    {
      id: 1,
      title: "Real-World Scale Measurement",
      subtitle: "From Maps to Reality",
      description:
        "Students explore scale through practical measurement of school facilities using Google Maps and digital tools",
      color: "from-blue-500 to-cyan-500",
      icon: <MapPin className='w-6 h-6' />,
      activities: [
        {
          title: "School Field Measurement",
          description:
            "Calculate actual dimensions using Google Maps aerial images and Canva rulers",
          tools: ["Google Maps", "Canva", "Digital Rulers"],
          assessment:
            "Examine students' use of digital rulers and measurement accuracy",
          icon: <Calculator className='w-5 h-5' />,
        },
        {
          title: "AI-Assisted Framework",
          description:
            "Use ChatGPT-4o to obtain step-by-step measurement frameworks",
          tools: ["ChatGPT-4o", "Poe Platform"],
          assessment: "Framework application and calculation accuracy",
          icon: <Brain className='w-5 h-5' />,
        },
      ],
    },
    {
      id: 2,
      title: "Shape Identification & Properties",
      subtitle: "Recognizing Enlargements & Reductions",
      description:
        "Students identify and mark enlarged/reduced figures while exploring similar shape properties",
      color: "from-purple-500 to-pink-500",
      icon: <Square className='w-6 h-6' />,
      activities: [
        {
          title: "Figure Classification",
          description:
            "Use +/- symbols in Canva to mark enlarged and reduced diagrams",
          tools: ["Canva", "Digital Marking Tools"],
          assessment:
            "Evaluate accuracy of enlargement/reduction identification",
          icon: <PenTool className='w-5 h-5' />,
        },
        {
          title: "AI Verification",
          description:
            "Upload results to ChatGPT-4o for immediate feedback and explanations",
          tools: ["ChatGPT-4o", "Image Upload", "Poe Platform"],
          assessment: "AI-provided feedback analysis and student response",
          icon: <CheckCircle className='w-5 h-5' />,
        },
      ],
    },
    {
      id: 3,
      title: "Hands-On Rubber Band Exploration",
      subtitle: "Physical Manipulation Meets Digital Discovery",
      description:
        "Students use rubber bands to create enlarged figures and discover proportional relationships",
      color: "from-green-500 to-emerald-500",
      icon: <Activity className='w-6 h-6' />,
      activities: [
        {
          title: "3x Enlargement Creation",
          description:
            "Connect rubber bands to draw figures enlarged three times using physical manipulation",
          tools: ["Rubber Bands", "Drawing Tools", "Measurement Equipment"],
          assessment:
            "Video documentation of process and accuracy verification",
          icon: <Triangle className='w-5 h-5' />,
        },
        {
          title: "Peer Documentation",
          description:
            "Students work in pairs to record and upload the enlargement process",
          tools: ["Tablets", "Padlet", "Video Recording"],
          assessment: "Quality of documentation and peer collaboration",
          icon: <Video className='w-5 h-5' />,
        },
        {
          title: "Proportion Discovery",
          description:
            "Measure and calculate ratios to summarize similar shape properties",
          tools: ["Canva", "Measurement Tools", "Calculation Sheets"],
          assessment:
            "Understanding of proportional relationships and formulas",
          icon: <Calculator className='w-5 h-5' />,
        },
      ],
    },
  ];

  const learningContent = [
    {
      title: "Similar Shapes Fundamentals",
      points: [
        "Meaning of enlargement and reduction of plane figures",
        "Definition of similar polygons",
        "Corresponding angles are equal",
        "Corresponding sides are proportional",
      ],
    },
    {
      title: "Triangle Similarity Properties",
      points: [
        "Similarity criteria (AA, SAS, SSS)",
        "Ratio relationships in corresponding elements",
        "Area ratios equal squares of side ratios",
        "Practical problem-solving applications",
      ],
    },
    {
      title: "Parallel Lines & Proportional Segments",
      points: [
        "Midpoint connection properties",
        "Parallel line segment relationships",
        "Using proportions to determine parallelism",
        "Real-world applications",
      ],
    },
  ];

  const toolCategories = [
    {
      name: "Digital Exploration",
      tools: ["Google Maps", "Canva", "Digital Rulers"],
      color: "bg-blue-100 text-blue-800",
    },
    {
      name: "AI Integration",
      tools: ["ChatGPT-4o", "Poe Platform", "Image Recognition"],
      color: "bg-purple-100 text-purple-800",
    },
    {
      name: "Documentation",
      tools: ["Padlet", "Video Recording", "Tablets"],
      color: "bg-green-100 text-green-800",
    },
    {
      name: "Physical Materials",
      tools: ["Rubber Bands", "Drawing Tools", "Measurement Equipment"],
      color: "bg-orange-100 text-orange-800",
    },
  ];

  return (
    <>
      <Header />
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
        {/* Hero Section */}
        <div className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden'>
          <div className='absolute inset-0 bg-black/10'></div>
          <div className='relative container mx-auto px-6 py-20'>
            <div className='max-w-4xl mx-auto text-center'>
              <div className='flex justify-center mb-8'>
                <div className='p-4 bg-white/20 rounded-full backdrop-blur-sm'>
                  <Triangle className='w-16 h-16' />
                </div>
              </div>
              <h1 className='text-5xl md:text-7xl font-bold mb-6 leading-tight'>
                Ratio and Similar Shapes
              </h1>
              <p className='text-xl md:text-2xl mb-8 text-purple-100 leading-relaxed'>
                An Innovative Teaching Case Study Integrating Digital Tools and
                AI Technology
              </p>
              <div className='flex flex-wrap justify-center gap-4 mb-8'>
                <Badge className='px-6 py-3 text-base bg-white/20 text-white border-white/30 hover:bg-white/30'>
                  <MapPin className='w-5 h-5 mr-2' />
                  Real-World Applications
                </Badge>
                <Badge className='px-6 py-3 text-base bg-white/20 text-white border-white/30 hover:bg-white/30'>
                  <Brain className='w-5 h-5 mr-2' />
                  AI-Enhanced Learning
                </Badge>
                <Badge className='px-6 py-3 text-base bg-white/20 text-white border-white/30 hover:bg-white/30'>
                  <Activity className='w-5 h-5 mr-2' />
                  Hands-On Discovery
                </Badge>
              </div>
              <p className='text-lg text-purple-100 max-w-3xl mx-auto'>
                A comprehensive approach combining traditional mathematical
                concepts with cutting-edge digital tools and AI technology for
                enhanced student engagement and understanding.
              </p>
            </div>
          </div>
        </div>

        <div className='container mx-auto px-6 py-12'>
          {/* Learning Objectives */}
          <section className='mb-16'>
            <div className='text-center mb-12'>
              <h2 className='text-4xl font-bold mb-4 text-gray-800'>
                Learning Objectives
              </h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                Comprehensive goals spanning knowledge acquisition, skill
                development, and process mastery
              </p>
            </div>

            <Tabs defaultValue='knowledge' className='w-full'>
              <TabsList className='grid w-full grid-cols-2 mb-8'>
                <TabsTrigger value='knowledge' className='text-lg py-3'>
                  <BookOpen className='w-5 h-5 mr-2' />
                  Knowledge & Skills
                </TabsTrigger>
                <TabsTrigger value='process' className='text-lg py-3'>
                  <Zap className='w-5 h-5 mr-2' />
                  Process & Methods
                </TabsTrigger>
              </TabsList>

              <TabsContent value='knowledge'>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {learningObjectives.knowledge.map((obj, index) => (
                    <Card
                      key={index}
                      className='border-0 shadow-lg hover:shadow-xl transition-all duration-300'
                    >
                      <CardHeader>
                        <div className='flex items-center gap-3 mb-2'>
                          <div className='p-2 bg-blue-100 rounded-lg text-blue-600'>
                            {obj.icon}
                          </div>
                          <Badge variant='outline' className='text-xs'>
                            Knowledge
                          </Badge>
                        </div>
                        <CardTitle className='text-lg'>{obj.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className='text-sm leading-relaxed'>
                          {obj.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value='process'>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {learningObjectives.process.map((obj, index) => (
                    <Card
                      key={index}
                      className='border-0 shadow-lg hover:shadow-xl transition-all duration-300'
                    >
                      <CardHeader>
                        <div className='flex items-center gap-3 mb-2'>
                          <div className='p-2 bg-purple-100 rounded-lg text-purple-600'>
                            {obj.icon}
                          </div>
                          <Badge variant='outline' className='text-xs'>
                            Process
                          </Badge>
                        </div>
                        <CardTitle className='text-lg'>{obj.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className='text-sm leading-relaxed'>
                          {obj.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </section>

          {/* Learning Content Overview */}
          <section className='mb-16'>
            <div className='text-center mb-12'>
              <h2 className='text-4xl font-bold mb-4 text-gray-800'>
                Learning Content
              </h2>
              <p className='text-xl text-gray-600'>
                Core mathematical concepts and their applications
              </p>
            </div>

            <div className='grid md:grid-cols-3 gap-6'>
              {learningContent.map((content, index) => (
                <Card key={index} className='border-0 shadow-lg'>
                  <CardHeader>
                    <CardTitle className='text-xl text-center'>
                      {content.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className='space-y-3'>
                      {content.points.map((point, pointIndex) => (
                        <li
                          key={pointIndex}
                          className='flex items-start gap-2 text-sm'
                        >
                          <CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Teaching Sections */}
          <section className='mb-16'>
            <div className='text-center mb-12'>
              <h2 className='text-4xl font-bold mb-4 text-gray-800'>
                Teaching Process
              </h2>
              <p className='text-xl text-gray-600'>
                Three progressive sections building comprehensive understanding
              </p>
            </div>

            {/* Section Navigation */}
            <div className='flex justify-center mb-8'>
              <div className='flex space-x-2 bg-white rounded-lg p-1 shadow-lg'>
                {sections.map((section, index) => (
                  <Button
                    key={section.id}
                    variant={activeSection === index ? "default" : "ghost"}
                    onClick={() => setActiveSection(index)}
                    className='px-6 py-2'
                  >
                    Section {section.id}
                  </Button>
                ))}
              </div>
            </div>

            {/* Active Section Display */}
            <Card className='border-0 shadow-xl overflow-hidden'>
              <div
                className={`bg-gradient-to-r ${sections[activeSection].color} text-white p-8`}
              >
                <div className='flex items-center gap-4 mb-4'>
                  <div className='p-3 bg-white/20 rounded-full'>
                    {sections[activeSection].icon}
                  </div>
                  <div>
                    <h3 className='text-3xl font-bold'>
                      {sections[activeSection].title}
                    </h3>
                    <p className='text-xl opacity-90'>
                      {sections[activeSection].subtitle}
                    </p>
                  </div>
                </div>
                <p className='text-lg opacity-90 max-w-3xl'>
                  {sections[activeSection].description}
                </p>
              </div>

              <CardContent className='p-8'>
                <div className='space-y-6'>
                  {sections[activeSection].activities.map((activity, index) => (
                    <Card key={index} className='border border-gray-200'>
                      <CardHeader>
                        <div className='flex items-center gap-3'>
                          <div className='p-2 bg-gray-100 rounded-lg'>
                            {activity.icon}
                          </div>
                          <div>
                            <CardTitle className='text-xl'>
                              Activity {index + 1}: {activity.title}
                            </CardTitle>
                            <CardDescription className='text-base mt-1'>
                              {activity.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className='grid md:grid-cols-2 gap-6'>
                          <div>
                            <h4 className='font-semibold mb-3 text-gray-800'>
                              Digital Tools Used
                            </h4>
                            <div className='flex flex-wrap gap-2'>
                              {activity.tools.map((tool, toolIndex) => (
                                <Badge
                                  key={toolIndex}
                                  variant='secondary'
                                  className='text-xs'
                                >
                                  {tool}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className='font-semibold mb-3 text-gray-800'>
                              Assessment Focus
                            </h4>
                            <p className='text-sm text-gray-600 leading-relaxed'>
                              {activity.assessment}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Tools & Technology */}
          <section className='mb-16'>
            <div className='text-center mb-12'>
              <h2 className='text-4xl font-bold mb-4 text-gray-800'>
                Tools & Technology Integration
              </h2>
              <p className='text-xl text-gray-600'>
                Comprehensive digital ecosystem supporting modern mathematics
                education
              </p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {toolCategories.map((category, index) => (
                <Card key={index} className='border-0 shadow-lg'>
                  <CardHeader>
                    <CardTitle className='text-lg text-center'>
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-2'>
                      {category.tools.map((tool, toolIndex) => (
                        <div
                          key={toolIndex}
                          className={`px-3 py-2 rounded-lg text-center text-sm font-medium ${category.color}`}
                        >
                          {tool}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Key Features */}
          <section>
            <div className='text-center mb-12'>
              <h2 className='text-4xl font-bold mb-4 text-gray-800'>
                Key Innovation Features
              </h2>
              <p className='text-xl text-gray-600'>
                What makes this teaching approach unique and effective
              </p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
              <Card className='border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50'>
                <CardContent className='p-6 text-center'>
                  <Globe className='w-12 h-12 text-blue-600 mx-auto mb-4' />
                  <h3 className='font-bold text-lg mb-2 text-blue-800'>
                    Real-World Connection
                  </h3>
                  <p className='text-blue-700 text-sm'>
                    Using Google Maps and actual school measurements to bridge
                    theory and practice
                  </p>
                </CardContent>
              </Card>

              <Card className='border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50'>
                <CardContent className='p-6 text-center'>
                  <Brain className='w-12 h-12 text-purple-600 mx-auto mb-4' />
                  <h3 className='font-bold text-lg mb-2 text-purple-800'>
                    AI-Enhanced Learning
                  </h3>
                  <p className='text-purple-700 text-sm'>
                    ChatGPT-4o integration for personalized feedback and
                    step-by-step guidance
                  </p>
                </CardContent>
              </Card>

              <Card className='border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50'>
                <CardContent className='p-6 text-center'>
                  <Activity className='w-12 h-12 text-green-600 mx-auto mb-4' />
                  <h3 className='font-bold text-lg mb-2 text-green-800'>
                    Hands-On Discovery
                  </h3>
                  <p className='text-green-700 text-sm'>
                    Physical manipulation with rubber bands leading to
                    mathematical insights
                  </p>
                </CardContent>
              </Card>

              <Card className='border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50'>
                <CardContent className='p-6 text-center'>
                  <Users className='w-12 h-12 text-orange-600 mx-auto mb-4' />
                  <h3 className='font-bold text-lg mb-2 text-orange-800'>
                    Collaborative Learning
                  </h3>
                  <p className='text-orange-700 text-sm'>
                    Peer documentation and shared discovery through digital
                    platforms
                  </p>
                </CardContent>
              </Card>

              <Card className='border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-blue-50'>
                <CardContent className='p-6 text-center'>
                  <CheckCircle className='w-12 h-12 text-indigo-600 mx-auto mb-4' />
                  <h3 className='font-bold text-lg mb-2 text-indigo-800'>
                    Immediate Feedback
                  </h3>
                  <p className='text-indigo-700 text-sm'>
                    AI-powered verification and assessment providing instant
                    learning support
                  </p>
                </CardContent>
              </Card>

              <Card className='border-0 shadow-lg bg-gradient-to-br from-teal-50 to-green-50'>
                <CardContent className='p-6 text-center'>
                  <Camera className='w-12 h-12 text-teal-600 mx-auto mb-4' />
                  <h3 className='font-bold text-lg mb-2 text-teal-800'>
                    Digital Documentation
                  </h3>
                  <p className='text-teal-700 text-sm'>
                    Video recording and digital portfolios capturing the
                    learning process
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RatioShapesShowcase;
