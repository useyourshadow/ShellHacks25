import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-sky-50 to-blue-100 py-20 px-4 overflow-hidden">
      {/* Background decoration */}
      <motion.div 
        className="absolute inset-0 bg-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      ></motion.div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl text-slate-800 tracking-tight">
                MindCare
              </h1>
              <p className="text-xl lg:text-2xl text-slate-600 max-w-lg">
                Peace of Mind for Dementia Care
              </p>
            </div>
            
            <p className="text-lg text-slate-700 max-w-xl leading-relaxed">
              A simple, caring website that helps your loved ones stay safe, connected, and independent. 
              Designed specifically for dementia patients and their families.
            </p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <button className="btn btn-primary btn-lg bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border-none">
                Get Started Today
              </button>
              <button className="btn btn-outline btn-lg border-2 border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-2xl">
                Learn More
              </button>
            </motion.div>
          </motion.div>
          
          {/* Phone mockup */}
          <motion.div 
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1620856902651-ce18d6d31d42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9ja3VwJTIwZGVtZW50aWElMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU4OTQyMjkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="MindCare website interface showing medication reminders and call features"
                  className="w-80 h-auto rounded-3xl shadow-2xl"
                />
              </motion.div>
              
              {/* Floating notification */}
              <motion.div 
                className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <motion.span 
                  className="text-sm"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Pill Reminder!
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}