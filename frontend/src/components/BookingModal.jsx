import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import { CheckCircleIcon, CalendarIcon, UserIcon, ClockIcon } from "@heroicons/react/24/solid";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";

const services = [
  { name: "Portrait Photoshoot", duration: "45 min" },
  { name: "Birthday Photoshoot", duration: "1 hour" },
  { name: "Wedding Consultation", duration: "1.5 hours" },
  { name: "Corporate Headshots", duration: "30 min" },
  { name: "Beauty/Fashion Photoshoot", duration: "1 hour" },
];

const timeslots = [
  "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

const BookingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [formData, setFormData] = useState({
    service: "",
    specialRequest: "",
    date: dayjs().format("YYYY-MM-DD"),
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, date: selectedDate.format("YYYY-MM-DD") }));
  }, [selectedDate]);

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleSubmit = () => {
    console.log("Booking Info:", formData);
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setStep(1);
      setFormData({
        service: "",
        specialRequest: "",
        date: dayjs().format("YYYY-MM-DD"),
        time: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      });
      onClose();
    }, 2500);
  };

  const progressPercent = (step / 5) * 100;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 translate-y-10 scale-90"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-10 scale-90"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white shadow-xl transition-all relative">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                  aria-label="Close"
                >
                  ✕
                </button>

                {/* Confirmation */}
                {showConfirmation && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
                    <div className="text-center">
                      <CheckCircleIcon className="w-16 h-16 text-green-400 mb-4" />
                      <h2 className="text-3xl font-bold text-green-400">Booking Confirmed!</h2>
                      <p className="mt-4">Thank you for choosing JBS Studios.</p>
                    </div>
                  </div>
                )}

                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-2 mb-6 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Main Content */}
                <div className="flex flex-col md:flex-row">
                  {/* Summary Left */}
                  <div className="w-full md:w-1/2 bg-gray-900 p-8 hidden md:block">
                    <h2 className="text-3xl font-bold mb-6">Booking Details</h2>
                    <ul className="space-y-4">
                      <li><strong>Service:</strong> {formData.service || "Not selected"}</li>
                      <li><strong>Special Request:</strong> {formData.specialRequest || "None"}</li>
                      <li><strong>Date:</strong> {formData.date}</li>
                      <li><strong>Time:</strong> {formData.time || "Not selected"}</li>
                      <li><strong>Name:</strong> {formData.firstName} {formData.lastName}</li>
                      <li><strong>Email:</strong> {formData.email}</li>
                      <li><strong>Phone:</strong> {formData.phone}</li>
                    </ul>
                  </div>

                  {/* Steps Right */}
                  <div className="w-full md:w-1/2 p-8 space-y-8">
                    {step > 1 && (
                      <button
                        onClick={handleBack}
                        className="text-purple-500 hover:underline mb-4"
                      >
                        ← Back
                      </button>
                    )}

                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <h2 className="text-3xl font-bold text-center">Select a Service</h2>
                          <div className="grid grid-cols-1 gap-4">
                            {services.map((service, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setFormData((prev) => ({ ...prev, service: service.name }));
                                  handleNext();
                                }}
                                className="w-full p-4 border border-gray-600 rounded-xl hover:border-purple-500 text-left bg-gray-800 hover:bg-gray-700"
                              >
                                <div className="font-semibold text-lg">{service.name}</div>
                                <div className="text-gray-400 text-sm">{service.duration}</div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <h2 className="text-3xl font-bold text-center">Special Request</h2>
                          <textarea
                            rows="4"
                            placeholder="Describe anything special (optional)"
                            value={formData.specialRequest}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, specialRequest: e.target.value }))
                            }
                            className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl"
                          />
                          <button
                            onClick={handleNext}
                            className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-lg font-semibold transition"
                          >
                            Next
                          </button>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <h2 className="text-3xl font-bold text-center">Pick a Date</h2>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              value={selectedDate}
                              onChange={(newDate) => setSelectedDate(newDate)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  variant="outlined"
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      backgroundColor: "#1f2937",
                                      color: "#fff",
                                      borderRadius: "8px",
                                    },
                                    "& .MuiOutlinedInput-notchedOutline": {
                                      borderColor: "#4b5563",
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                      borderColor: "#6366f1",
                                    },
                                    "& .MuiInputLabel-root": {
                                      color: "#9ca3af",
                                    },
                                  }}
                                />
                              )}
                            />
                          </LocalizationProvider>
                          <h2 className="text-3xl font-bold text-center">Pick a Time</h2>
                          <select
                            value={formData.time}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, time: e.target.value }))
                            }
                            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
                          >
                            <option value="">Select a time</option>
                            {timeslots.map((time, idx) => (
                              <option key={idx} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={handleNext}
                            disabled={!formData.time}
                            className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-lg font-semibold transition"
                          >
                            Next
                          </button>
                        </motion.div>
                      )}

                      {step === 4 && (
                        <motion.div
                          key="step4"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <h2 className="text-3xl font-bold text-center">Your Info</h2>
                          <input
                            type="text"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, firstName: e.target.value }))
                            }
                            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
                          />
                          <input
                            type="text"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, lastName: e.target.value }))
                            }
                            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
                          />
                          <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, email: e.target.value }))
                            }
                            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
                          />
                          <input
                            type="tel"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, phone: e.target.value }))
                            }
                            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
                          />
                          <button
                            onClick={handleSubmit}
                            disabled={!formData.firstName || !formData.email}
                            className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-lg font-semibold transition"
                          >
                            Confirm Booking
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BookingModal;