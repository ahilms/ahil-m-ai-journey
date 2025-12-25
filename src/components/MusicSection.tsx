import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Music, Mic2, Heart } from "lucide-react";

export const MusicSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6 animate-glow-pulse">
            <Music className="text-primary" size={28} />
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Beyond the Code: <span className="gradient-text">My Musical Side</span>
          </h2>

          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            When I'm not diving into datasets or training models, you'll find me expressing myself through music. 
            Singing is not just a hobby—it's a creative outlet that keeps me balanced and inspired.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-8 flex flex-col sm:flex-row items-center gap-6"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
              <Mic2 className="text-primary-foreground" size={36} />
            </div>
            <div className="text-left">
              <h3 className="font-heading text-lg font-semibold mb-2 text-foreground">
                Passionate Singer
              </h3>
              <p className="text-muted-foreground text-sm">
                Music brings creativity to my technical journey. The discipline required in singing—practice, 
                patience, and perseverance—mirrors the skills needed in AI development. 
                Both require attention to detail and the courage to keep improving.
              </p>
              <div className="flex items-center gap-2 mt-3 text-primary">
                <Heart size={16} className="fill-primary" />
                <span className="text-sm font-medium">Music + AI = Creativity Unleashed</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
