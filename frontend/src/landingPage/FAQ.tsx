import { HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "Is MindCare suitable for someone who isn't comfortable with technology?",
    answer: "Absolutely. MindCare is specifically designed for simplicity. We use large buttons, clear text, and intuitive navigation. Many of our users had never used technology before and found it easy to learn with family support."
  },
  {
    question: "How do medication reminders work, and are they reliable?",
    answer: "Our medication reminders are gentle, visual notifications that appear on screen with clear instructions. They repeat until acknowledged and send backup alerts to family members if needed. The system is designed to be non-intrusive while ensuring important medications aren't missed."
  },
  {
    question: "Can family members monitor their loved one's activity without being intrusive?",
    answer: "Yes, MindCare provides peace of mind through optional check-ins and activity summaries. All monitoring features require consent and are designed to support independence while keeping families informed about safety and wellbeing."
  },
  {
    question: "What happens if my loved one gets confused or frustrated with the website?",
    answer: "MindCare includes built-in support features like simple help buttons, clear instructions, and the ability for family members to provide remote assistance. Our design minimizes confusion through consistent layouts and familiar icons."
  },
  {
    question: "Is my loved one's personal information secure and private?",
    answer: "Security and privacy are our top priorities. All data is encrypted, stored securely, and only accessible by authorized family members. We comply with healthcare privacy regulations and never share personal information with third parties."
  },
  {
    question: "How much does MindCare cost, and are there any hidden fees?",
    answer: "MindCare offers transparent pricing with no hidden fees. We provide a free basic plan with essential features, and affordable premium plans for advanced functionality. All pricing is clearly displayed with no surprise charges."
  }
];

export function FAQ() {
  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex justify-center mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HelpCircle className="w-8 h-8 text-blue-500" />
          </motion.div>
          <h2 className="text-3xl lg:text-4xl text-slate-800">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Common questions from families about using MindCare for dementia care and support.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="collapse collapse-plus bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-left text-lg text-slate-800 hover:text-blue-600 py-6 px-6">
                  {faq.question}
                </div>
                <div className="collapse-content px-6">
                  <p className="text-slate-600 leading-relaxed text-base pb-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-slate-600">
            Have more questions? We're here to help.{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 underline">
              Contact our support team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}