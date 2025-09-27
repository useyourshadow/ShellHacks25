import { Pill, Phone, Calendar, Shield, Heart } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Pill className="w-12 h-12 text-green-600" />,
    title: "Medication Reminders",
    description: "Large, clear notifications that are impossible to miss. Simple visual and audio cues help ensure medications are taken on time, every time."
  },
  {
    icon: <Phone className="w-12 h-12 text-blue-600" />,
    title: "AI-Assisted Calls",
    description: "Family members can connect instantly through our smart calling system. AI helps guide conversations and ensures clear communication."
  },
  {
    icon: <Calendar className="w-12 h-12 text-purple-600" />,
    title: "Daily Schedule",
    description: "Easy-to-read daily schedules with large text and simple layouts. Helps maintain routine and provides structure throughout the day."
  },
  {
    icon: <Shield className="w-12 h-12 text-orange-600" />,
    title: "Caregiver Alerts",
    description: "Instant notifications to family members when assistance is needed. Peace of mind knowing your loved one is safe and supported."
  }
];

export function Features(){
    return(
        <section className = "py-20 -x-4 bg-white">
            <div className = "container mx-auto max-w-6xl">
                <motion.div
                className = "text-center space-y-4"
                initial = {{opacity: 0, y:30}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.6}}>
                    <motion.div
                    className = "flex justify-center mb-4"
                    initial={{scale: 0}}
                    whileInView={{scale: 1}}
                    viewport = {{once:true}}
                    transition= {{duration: 0.5, delay: 0.2}}>
                        <Heart className = "w-8 h-8 text-rose-500"></Heart>
                    </motion.div>
                    <h2 className = "text-3xl lg:text-4xl text-slate-800">
                        Everything You Need for Caring Support
                    </h2>
                    <p className = "text-lg text-slate-600 max-w-2xl mx-auto">
                        Simple, powerful features designed with accessibility and ease-of-use in mind. 
                        Every detail crafted for both patients and their families.
                    </p>
                </motion.div>
                <div className = "grid md: grid-cols-2 lg:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                        key = {index}
                        initial = {{opacity: 0, y:30}}
                        whileInView = {{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.6, delay: index * 0.1}}
                        >                            <div className = "card bg-white border-2 border-slate-100 rounded-2xl hover: shadow-lg transition-shadow duration-200 h-full">
                                <div className = "card-body space-y-4 p-6">
                                    <div className = "flex items-center gap-4">
                                        <motion.div
                                        className = "p-3 bg-slate-50 rounded-2xl"
                                        whileHover = {{scale: 1.1}}
                                        transition = {{duration: 0.2}}>
                                            {feature.icon}
                                        </motion.div>
                                        <h3 className = "text-xl text-slate-800">
                                            {feature.title}
                                        </h3>
                                    </div>
                                    <p className = "text-slate-600">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}