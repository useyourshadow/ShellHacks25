import { Smartphone, Download } from "lucide-react";
import { motion } from "framer-motion";
export function CallToAction() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-green-500">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          className="space-y-8 text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-4">
            <motion.h2
              className="text-3xl lg:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Keep Your Loved Ones Safe and Connected
            </motion.h2>
            <motion.p
              className="text-lg lg:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Join thousands of families who trust ReMind to provide
              compassionate, reliable support for their loved ones with
              dementia.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Get Started Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button className="btn btn-lg bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-3 border-none">
                <Smartphone className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs text-blue-400">Start using</div>
                  <div className="text-base">ReMind today</div>
                </div>
              </button>
            </motion.div>

            {/* Learn More Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button className="btn btn-outline btn-lg border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-3">
                <Download className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs opacity-80">Learn more about</div>
                  <div className="text-base">Our features</div>
                </div>
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            className="pt-8 border-t border-white/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-blue-100 text-sm">
              Free to access • Works on all devices • Trusted by healthcare
              professionals
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
