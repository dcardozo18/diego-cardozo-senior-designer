
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const skills = [
  'React', 'Next.js', 'TypeScript', 'JavaScript (ES6+)',
  'Tailwind CSS', 'Framer Motion', 'Node.js', 'UI/UX Design', 'Figma', 'GenAI Integration'
];

const experiences = [
  {
    role: 'Lead Web Designer',
    company: 'Creative Solutions Inc.',
    period: '2020 - Present',
    description: 'Leading design and development of modern web applications, focusing on user experience and interactive design. Integrating AI features to create smarter, more dynamic user interfaces.'
  },
  {
    role: 'Frontend Developer',
    company: 'Tech Innovators',
    period: '2018 - 2020',
    description: 'Developed and maintained responsive websites and web applications using modern frontend technologies. Collaborated with designers and backend developers to deliver high-quality products.'
  },
  {
    role: 'UI/UX Design Intern',
    company: 'Design Hub',
    period: '2017 - 2018',
    description: 'Assisted in designing user interfaces and creating prototypes. Conducted user research and usability testing to improve product design.'
  }
];

const AboutSection = () => {
  return (
    <section id="about" className="bg-secondary py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
            About <span className="text-accent">Me</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A passionate designer and developer with a love for creating beautiful, functional digital art.
          </p>
        </div>
        <div className="grid gap-16 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="relative mx-auto h-64 w-64 lg:h-80 lg:w-80 overflow-hidden rounded-full shadow-2xl">
              <Image
                src="https://picsum.photos/seed/profile/400/400"
                alt="Profile picture"
                width={400}
                height={400}
                data-ai-hint="professional portrait"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-8 text-center">
                <h3 className="text-2xl font-bold">John Doe</h3>
                <p className="text-muted-foreground">Creative Web Developer & Designer</p>
            </div>
             <div className="mt-8">
              <h3 className="mb-4 text-center text-xl font-semibold">My Skillset</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {skills.map(skill => (
                  <Badge key={skill} variant="outline" className="border-accent text-accent bg-accent/10 px-3 py-1 text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <h3 className="mb-8 text-center text-2xl font-semibold lg:text-left">Work Experience</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
              {experiences.map((exp, index) => (
                <div key={index} className="relative mb-8 pl-12">
                   <div className="absolute left-4 top-1 h-3 w-3 rounded-full bg-accent -translate-x-1/2 border-4 border-secondary"></div>
                  <p className="font-mono text-sm text-muted-foreground">{exp.period}</p>
                  <h4 className="text-xl font-bold text-primary">{exp.role}</h4>
                  <p className="font-semibold text-muted-foreground">{exp.company}</p>
                  <p className="mt-2 text-foreground/80">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
