import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Check, ChevronLeft, AlertCircle } from 'lucide-react'
import api from '../api/axios'

const EMPTY_CUSTOMER = { name: '', email: '', phone: '' }

function BookingModal({ isOpen, onClose, theme }) {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedCar, setSelectedCar] = useState(null)
  const [customer, setCustomer] = useState(EMPTY_CUSTOMER)
  const [errors, setErrors] = useState({})
  const [cars, setCars] = useState([])
  const [isLoadingCars, setIsLoadingCars] = useState(false)
  const [apiError, setApiError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!selectedDate) {
      setCars([])
      return
    }
    setIsLoadingCars(true)
    setApiError('')
    api
      .get('cars/availability/', { params: { date: selectedDate } })
      .then((res) => setCars(res.data))
      .catch(() => setApiError("Couldn't load car availability. Make sure the backend is running."))
      .finally(() => setIsLoadingCars(false))
  }, [selectedDate])

  const resetAndClose = () => {
    setStep(1)
    setSelectedDate('')
    setSelectedCar(null)
    setCustomer(EMPTY_CUSTOMER)
    setErrors({})
    setApiError('')
    onClose()
  }

  const goToDetails = () => {
    if (!selectedDate || !selectedCar) return
    setStep(2)
  }

  const validateDetails = () => {
    const newErrors = {}
    if (!customer.name.trim()) newErrors.name = 'Name is required'
    if (!/^\S+@\S+\.\S+$/.test(customer.email)) newErrors.email = 'Enter a valid email'
    if (!/^\d{10}$/.test(customer.phone.replace(/\D/g, ''))) newErrors.phone = 'Enter a valid 10-digit phone number'
    return newErrors
  }

  const handleConfirm = async () => {
    const validationErrors = validateDetails()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setIsSubmitting(true)
    setApiError('')
    try {
      await api.post('bookings/', {
        car: selectedCar.id,
        date: selectedDate,
        customer_name: customer.name,
        email: customer.email,
        phone: customer.phone,
      })
      setStep(3)
    } catch (err) {
      const backendError =
        err.response?.data?.non_field_errors?.[0] ||
        err.response?.data?.detail ||
        'This car may have just been booked by someone else. Please pick another.'
      setApiError(backendError)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0"
        style={{ backgroundColor: `${theme.bg}CC`, backdropFilter: 'blur(6px)' }}
        onClick={resetAndClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-lg rounded-2xl p-8 max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: theme.bgAlt, border: `1px solid ${theme.accent}33` }}
      >
        <div className="flex items-center justify-between mb-6">
          {step > 1 && step < 3 ? (
            <button onClick={() => setStep(step - 1)} style={{ color: theme.textMuted }}>
              <ChevronLeft size={20} />
            </button>
          ) : (
            <div />
          )}
          <p className="text-xs tracking-widest uppercase" style={{ color: theme.accent }}>
            {step === 1 && 'Select Date & Car'}
            {step === 2 && 'Your Details'}
            {step === 3 && 'Confirmed'}
          </p>
          <button onClick={resetAndClose} style={{ color: theme.textMuted }}>
            <X size={20} />
          </button>
        </div>

        {apiError && (
          <div
            className="flex items-start gap-2 px-4 py-3 rounded-lg mb-4 text-sm"
            style={{ backgroundColor: '#DC262622', color: '#F87171' }}
          >
            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
            {apiError}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <label className="flex items-center gap-2 text-sm mb-2" style={{ color: theme.text }}>
                <Calendar size={16} style={{ color: theme.accent }} />
                Choose a date
              </label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value)
                  setSelectedCar(null)
                }}
                className="w-full px-4 py-3 rounded-lg mb-6 text-sm focus:outline-none"
                style={{ backgroundColor: theme.bg, color: theme.text, border: `1px solid ${theme.accent}44` }}
              />

              <p className="text-sm mb-3" style={{ color: theme.text }}>
                {selectedDate ? 'Available cars for this date' : 'Select a date to see availability'}
              </p>

              {isLoadingCars && (
                <p className="text-sm py-6 text-center" style={{ color: theme.textMuted }}>
                  Checking availability...
                </p>
              )}

              <div className="space-y-3">
                {!isLoadingCars &&
                  cars.map((car) => (
                    <button
                      key={car.id}
                      onClick={() => car.available && setSelectedCar(car)}
                      disabled={!car.available}
                      className="w-full flex items-center justify-between px-4 py-3.5 rounded-lg text-left transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: selectedCar?.id === car.id ? `${theme.accent}22` : theme.bg,
                        border: `1px solid ${selectedCar?.id === car.id ? theme.accent : `${theme.accent}22`}`,
                      }}
                    >
                      <div>
                        <p className="text-sm font-medium" style={{ color: theme.text }}>{car.name}</p>
                        <p className="text-xs" style={{ color: theme.textMuted }}>
                          {car.tag} {!car.available && '— Already booked'}
                        </p>
                      </div>
                      {selectedCar?.id === car.id && <Check size={18} style={{ color: theme.accent }} />}
                    </button>
                  ))}
              </div>

              <button
                onClick={goToDetails}
                disabled={!selectedDate || !selectedCar}
                className="w-full mt-6 py-3.5 rounded-lg text-sm tracking-widest uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:scale-[1.02]"
                style={{ backgroundColor: theme.accent, color: theme.bg }}
              >
                Continue
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <div
                className="flex items-center justify-between px-4 py-3 rounded-lg mb-6 text-sm"
                style={{ backgroundColor: theme.bg, color: theme.textMuted }}
              >
                <span>{selectedCar?.name}</span>
                <span>{selectedDate}</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: theme.textMuted }}>Full Name</label>
                  <input
                    type="text"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none"
                    style={{ backgroundColor: theme.bg, color: theme.text, border: `1px solid ${theme.accent}33` }}
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs mb-1.5" style={{ color: theme.textMuted }}>Email</label>
                  <input
                    type="email"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none"
                    style={{ backgroundColor: theme.bg, color: theme.text, border: `1px solid ${theme.accent}33` }}
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs mb-1.5" style={{ color: theme.textMuted }}>Phone</label>
                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none"
                    style={{ backgroundColor: theme.bg, color: theme.text, border: `1px solid ${theme.accent}33` }}
                  />
                  {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <button
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="w-full mt-6 py-3.5 rounded-lg text-sm tracking-widest uppercase transition-transform duration-200 hover:scale-[1.02] disabled:opacity-50"
                style={{ backgroundColor: theme.accent, color: theme.bg }}
              >
                {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: `${theme.accent}22` }}
              >
                <Check size={28} style={{ color: theme.accent }} />
              </motion.div>
              <h3 className="text-2xl mb-3" style={{ color: theme.text, fontFamily: "'Bebas Neue', sans-serif" }}>
                Booking Confirmed
              </h3>
              <p className="text-sm mb-1" style={{ color: theme.textMuted }}>
                {selectedCar?.name} on {selectedDate}
              </p>
              <p className="text-sm mb-8" style={{ color: theme.textMuted }}>
                A confirmation will be sent to {customer.email}
              </p>
              <button
                onClick={resetAndClose}
                className="px-8 py-3 rounded-lg text-sm tracking-widest uppercase"
                style={{ backgroundColor: theme.accent, color: theme.bg }}
              >
                Done
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default BookingModal