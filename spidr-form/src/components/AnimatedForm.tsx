import React, { useState } from 'react';
import { motion, AnimatePresence, easeOut, easeInOut } from 'framer-motion';
import { gsap } from 'gsap';
interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  airFryerCost: string;
  spidrPin: string;
}

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1,
      ease: easeOut,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

const inputVariants = {
  focus: {
    scale: 1.2,
    boxShadow: '0 0 0 2px #663ff33, 0 8px 32px 0 rgba(31,38, 135, 0.25)',
  },
  hover: {
    scale: 1.1,
    boxShadow: '0 4px 16px 0 rgba(31,38, 135, 0.15)',
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: '0 8px 32px 0 rgba(108, 99, 255, 0.15)',
    transition: { duration: 0.2, ease: easeInOut },
  },
  tap: {
    scale: 0.95,
  },
};

export default function AnimatedForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    airFryerCost: '',
    spidrPin: '',
  });

  const [focusedField, setFocusedField] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'spidrPin') {
      const cleaned = value.replace(/\D/g, '');
      const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1-');
      setFormData(prev => ({ ...prev, [name]: formatted.slice(0, 19) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Animate button on submit
    const button = e.currentTarget.querySelector('button');
    if (button) {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });
    }

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted with data:', formData);
    alert('Form submitted! Check the console for form data.');
  };

  const handleFieldFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleFieldBlur = () => {
    setFocusedField('');
  };

  return (
    <motion.div
      className="form-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="form-card"
        variants={itemVariants}
        whileHover={{ 
          scale: 1.02,
          transition: { duration:0.3}
        }}
      >
        <motion.h1 
          className="form-title"
          variants={itemVariants}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay:0.2 }}
        >
          Spidr Registration
        </motion.h1>
        
        <motion.p 
          className="form-subtitle"
          variants={itemVariants}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay:0.4 }}
        >
          Join the future of smart home technology
        </motion.p>
        
        <form onSubmit={handleSubmit} className="form">
          <motion.div className="form-row" variants={itemVariants}>
            <motion.div 
              className="form-group"
              whileHover={{ scale: 1.01 }}
            >
              <motion.label 
                htmlFor="firstName"
                animate={{ 
                  color: focusedField === 'firstName' ? '#6633ff' : '#666'
                }}
              >
                First Name
              </motion.label>
              <motion.input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                onFocus={() => handleFieldFocus('firstName')}
                onBlur={handleFieldBlur}
                required
                className="form-input"
                variants={inputVariants}
                whileFocus="focus"
                whileHover="hover"
              />
            </motion.div>
            
            <motion.div 
              className="form-group"
              whileHover={{ scale: 1.01 }}
            >
              <motion.label 
                htmlFor="lastName"
                animate={{ 
                  color: focusedField === 'lastName' ? '#6633ff' : '#666'
                }}
              >
                Last Name
              </motion.label>
              <motion.input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                onFocus={() => handleFieldFocus('lastName')}
                onBlur={handleFieldBlur}
                required
                className="form-input"
                variants={inputVariants}
                whileFocus="focus"
                whileHover="hover"
              />
            </motion.div>
          </motion.div>

          <motion.div className="form-row" variants={itemVariants}>
            <motion.div 
              className="form-group"
              whileHover={{ scale: 1.01 }}
            >
              <motion.label 
                htmlFor="phoneNumber"
                animate={{ 
                  color: focusedField === 'phoneNumber' ? '#6633ff' : '#666'
                }}
              >
                Phone Number
              </motion.label>
              <motion.input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                onFocus={() => handleFieldFocus('phoneNumber')}
                onBlur={handleFieldBlur}
                required
                className="form-input"
                placeholder="(555) 123-4567"
                variants={inputVariants}
                whileFocus="focus"
                whileHover="hover"
              />
            </motion.div>
            
            <motion.div 
              className="form-group"
              whileHover={{ scale: 1.01 }}
            >
              <motion.label 
                htmlFor="email"
                animate={{ 
                  color: focusedField === 'email' ? '#6633ff' : '#666'
                }}
              >
                Email Address
              </motion.label>
              <motion.input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => handleFieldFocus('email')}
                onBlur={handleFieldBlur}
                required
                className="form-input"
                placeholder="your@email.com"
                variants={inputVariants}
                whileFocus="focus"
                whileHover="hover"
              />
            </motion.div>
          </motion.div>

          <motion.div 
            className="form-group"
            variants={itemVariants}
            whileHover={{ scale:1.01 }}
          >
            <motion.label 
              htmlFor="airFryerCost"
              animate={{ 
                color: focusedField === 'airFryerCost' ? '#6635ff' : '#666'
              }}
            >
              Guess the Air Fryer's Cost
            </motion.label>
            <motion.div 
              className="input-with-prefix"
              variants={inputVariants}
              whileFocus="focus"
              whileHover="hover"
            >
              <span className="currency-prefix">$</span>
              <motion.input
                type="number"
                id="airFryerCost"
                name="airFryerCost"
                value={formData.airFryerCost}
                onChange={handleInputChange}
                onFocus={() => handleFieldFocus('airFryerCost')}
                onBlur={handleFieldBlur}
                required
                className="form-input"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </motion.div>
          </motion.div>

          <motion.div 
            className="form-group"
            variants={itemVariants}
            whileHover={{ scale:1.01 }}
          >
            <motion.label 
              htmlFor="spidrPin"
              animate={{ 
                color: focusedField === 'spidrPin' ? '#6635ff' : '#666'
              }}
            >
              Very Secret 16dr PIN
            </motion.label>
            <motion.input
              type="text"
              id="spidrPin"
              name="spidrPin"
              value={formData.spidrPin}
              onChange={handleInputChange}
              onFocus={() => handleFieldFocus('spidrPin')}
              onBlur={handleFieldBlur}
              required
              className="form-input"
              placeholder="####-####-####-####"
              maxLength={19}
              variants={inputVariants}
              whileFocus="focus"
              whileHover="hover"
            />
          </motion.div>

          <motion.button
            type="submit"
            className="submit-button"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            initial={{ opacity: 0, y:20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Submit Registration
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
} 