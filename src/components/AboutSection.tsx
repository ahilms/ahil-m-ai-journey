import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Music, Rocket, Target } from "lucide-react";

const highlights = [
  {
    icon: Brain,
    title: "AI Enthusiast",
    description: "Passionate about machine learning and intelligent systems",
  },
  {
    icon: Rocket,
    title: "Quick Learner",
    description: "Constantly exploring new technologies and concepts",
  },
  {
    icon: Target,
    title: "Goal-Oriented",
    description: "Focused on becoming a skilled AI/ML Engineer",
  },
  {
    icon: Music,
    title: "Creative Soul",
    description: "Singer who brings creativity to problem-solving",
  },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            About Me
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mt-2 mb-4 text-foreground">
            Get to Know Me
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass-card p-8">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Hello! I'm <span className="text-foreground font-medium">Ahil M</span>, a passionate B.Tech student specializing in{" "}
                  <span className="text-primary font-medium">Artificial Intelligence & Data Science</span> from India.
                </p>
                <p>
                  My journey into tech started from an unexpected background in Biology, but I discovered my true calling in the world of AI and machine learning. This transition has given me a unique perspective on problem-solving and data analysis.
                </p>
                <p>
                  I'm currently building my skills in Python, Machine Learning, and Data Science, working on projects that help me understand real-world applications of AI. Every day is a learning opportunity, and I embrace the challenges that come with mastering new technologies.
                </p>
                <p>
                  Beyond coding, I'm also a singer — creativity flows through everything I do. I believe this artistic side helps me think differently and approach problems with innovation.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="glass-card p-6 hover-lift group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
