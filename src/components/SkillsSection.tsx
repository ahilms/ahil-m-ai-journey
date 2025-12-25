import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Programming",
    skills: [
      { name: "Python", level: 75 },
      { name: "SQL", level: 60 },
      { name: "JavaScript", level: 40 },
    ],
  },
  {
    title: "AI & Machine Learning",
    skills: [
      { name: "Machine Learning", level: 55 },
      { name: "Data Analysis", level: 65 },
      { name: "Statistics", level: 60 },
    ],
  },
  {
    title: "Tools & Technologies",
    skills: [
      { name: "Git & GitHub", level: 70 },
      { name: "VS Code", level: 85 },
      { name: "Jupyter Notebook", level: 75 },
    ],
  },
  {
    title: "Soft Skills",
    skills: [
      { name: "Problem Solving", level: 80 },
      { name: "Self-Learning", level: 90 },
      { name: "Communication", level: 75 },
    ],
  },
];

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 md:py-32 bg-secondary/30 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            My Skills
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mt-2 mb-4 text-foreground">
            What I'm Good At
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="glass-card p-6 md:p-8"
            >
              <h3 className="font-heading text-xl font-semibold mb-6 text-primary">
                {category.title}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-foreground font-medium">
                        {skill.name}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.1 + skillIndex * 0.1 + 0.3,
                          ease: "easeOut",
                        }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
