import { Settings, Bot, Users } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    icon: <Settings className="w-10 h-10 text-blue-600" />,
    title: "Set Up Reminders",
    description:
      "Family members easily configure medication times, daily activities, and important routines through our simple interface.",
  },
  {
    number: "2",
    icon: <Bot className="w-10 h-10 text-green-600" />,
    title: "AI Monitors & Assists",
    description:
      "Our caring AI system monitors schedules, sends gentle reminders, and provides helpful guidance throughout the day.",
  },
  {
    number: "3",
    icon: <Users className="w-10 h-10 text-purple-600" />,
    title: "Stay Connected",
    description:
      "Caregivers receive updates and can connect instantly when needed. Everyone stays informed and supported.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl text-slate-800">
            How ReMind Works
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Getting started is simple. Our three-step process ensures your loved
            one gets the support they need while keeping family connected.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="text-center space-y-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Step number */}
              <div className="relative">
                <motion.div
                  className="w-16 h-16 bg-white rounded-full border-4 border-blue-200 flex items-center justify-center mx-auto shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-2xl text-blue-600">{step.number}</span>
                </motion.div>
              </div>

              {/* Icon */}
              <motion.div
                className="flex justify-center"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-4 bg-white rounded-2xl shadow-md">
                  {step.icon}
                </div>
              </motion.div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-xl text-slate-800">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
