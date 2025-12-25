import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Award, TrendingUp, Calendar } from "lucide-react";

const learningItems = [
  {
    title: "Machine Learning Fundamentals",
    source: "Online Course",
    status: "In Progress",
    progress: 65,
    icon: BookOpen,
  },
  {
    title: "Python for Data Science",
    source: "Self-Study + Practice",
    status: "Ongoing",
    progress: 80,
    icon: TrendingUp,
  },
  {
    title: "Statistics & Probability",
    source: "Academic + Online",
    status: "In Progress",
    progress: 55,
    icon: Award,
  },
  {
    title: "Deep Learning Basics",
    source: "Planned",
    status: "Upcoming",
    progress: 10,
    icon: Calendar,
  },
];

const roadmapSteps = [
  { step: 1, title: "Python Mastery", status: "active" },
  { step: 2, title: "ML Fundamentals", status: "active" },
  { step: 3, title: "Deep Learning", status: "upcoming" },
  { step: 4, title: "NLP & Computer Vision", status: "upcoming" },
  { step: 5, title: "Industry Projects", status: "upcoming" },
];

export const LearningSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="learning" className="py-20 md:py-32 bg-secondary/30 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Growth Journey
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mt-2 mb-4 text-foreground">
            Learning & Certifications
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Current Learning */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2 text-foreground">
              <BookOpen className="text-primary" size={24} />
              Current Learning
            </h3>
            <div className="space-y-4">
              {learningItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="glass-card p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <item.icon className="text-primary" size={18} />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">
                          {item.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {item.source}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        item.status === "In Progress"
                          ? "bg-primary/10 text-primary"
                          : item.status === "Ongoing"
                          ? "bg-accent/10 text-accent"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${item.progress}%` } : {}}
                      transition={{
                        duration: 1,
                        delay: 0.4 + index * 0.1,
                        ease: "easeOut",
                      }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Roadmap */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2 text-foreground">
              <TrendingUp className="text-primary" size={24} />
              My AI Roadmap
            </h3>
            <div className="glass-card p-6">
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-primary/30" />

                <div className="space-y-6">
                  {roadmapSteps.map((item, index) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-4 relative"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold z-10 ${
                          item.status === "active"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {item.step}
                      </div>
                      <div>
                        <h4
                          className={`font-medium ${
                            item.status === "active"
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {item.title}
                        </h4>
                        <span
                          className={`text-xs ${
                            item.status === "active"
                              ? "text-primary"
                              : "text-muted-foreground/60"
                          }`}
                        >
                          {item.status === "active" ? "In Progress" : "Coming Soon"}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
