import { useLocation, useNavigate } from 'react-router'
import { Switch } from 'react-router-dom'

import { motion, AnimatePresence } from 'framer-motion'

export default function AnimatedSwitch({ children }) {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <AnimatePresence
      mode='wait'
      initial={false}
      custom={{ action: navigate.action }}
    >
      <Route location={location} key={location.pathname}>
        {children}
      </Switch>
    </AnimatePresence>
  )
}
