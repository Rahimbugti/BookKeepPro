import React, { useState, useMemo } from 'react';
import { Header } from './components/Header.jsx';
import { HeroSection } from './components/HeroSection.jsx';
import { TrustLogos } from './components/TrustLogos.jsx';
import { PlatformPreview } from './components/PlatformPreview.jsx';
import { BlueChallengeSection } from './components/BlueChallengeSection.jsx';
import { YellowWhyUsSection } from './components/YellowWhyUsSection.jsx';
import { ServiceSelector } from './components/ServiceSelector.jsx';
import { SmallBusinessCalculator } from './components/SmallBusinessCalculator.jsx';
import { PropertyManagementCalculator } from './components/PropertyManagementCalculator.jsx';
import { PriceSummary } from './components/PriceSummary.jsx';
import { AppFolioServices } from './components/AppFolioServices.jsx';
import { FaqSection } from './components/FaqSection.jsx';
import { PurpleGlobalSection } from './components/PurpleGlobalSection.jsx';
import { PreFooterCta } from './components/PreFooterCta.jsx';
import { Footer, TrustBadges } from './components/Footer.jsx';
import { QuoteModal } from './components/QuoteModal.jsx';
import {
  calculateSmallBusinessPrice,
  calculatePropertyManagementPrice,
} from './utils/calculatePrice.js';

// Default initial state values
const defaultSmallBusinessState = {
  serviceType: 'monthly',
  transactionTier: '0-100',
  bankAccounts: 1,
  creditCards: 0,
  cleanupPeriod: 'none',
};

const defaultPropertyManagementState = {
  units: 10,
  propertyType: 'residential',
  bankAccounts: 1,
  creditCards: 0,
  selectedScopes: ['accountsPayable', 'bankReconciliation'],
};

export function App() {
  // Service selection: 'smallBusiness' | 'propertyManagement'
  const [selectedService, setSelectedService] = useState('smallBusiness');

  // Form states
  const [sbValues, setSbValues] = useState(defaultSmallBusinessState);
  const [pmValues, setPmValues] = useState(defaultPropertyManagementState);

  // Quote modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle service switching
  const handleSelectService = (serviceId) => {
    if (serviceId !== selectedService) {
      if (serviceId === 'smallBusiness') {
        setPmValues(defaultPropertyManagementState);
      } else {
        setSbValues(defaultSmallBusinessState);
      }
      setSelectedService(serviceId);
    }
  };

  // Change Service button action
  const handleChangeService = () => {
    const targetService = selectedService === 'smallBusiness' ? 'propertyManagement' : 'smallBusiness';
    handleSelectService(targetService);
  };

  // Reset current calculator to defaults
  const handleResetCurrent = () => {
    if (selectedService === 'smallBusiness') {
      setSbValues(defaultSmallBusinessState);
    } else {
      setPmValues(defaultPropertyManagementState);
    }
  };

  // Scroll to calculator
  const scrollToCalculator = () => {
    const el = document.getElementById('calculator-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Real-time calculated price and breakdown
  const calculationResult = useMemo(() => {
    if (selectedService === 'smallBusiness') {
      return calculateSmallBusinessPrice(sbValues);
    } else {
      return calculatePropertyManagementPrice(pmValues);
    }
  }, [selectedService, sbValues, pmValues]);

  const currentServiceName =
    selectedService === 'smallBusiness'
      ? 'Small Business Bookkeeping'
      : 'Property Management Bookkeeping';

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans antialiased selection:bg-[#E60050] selection:text-white">
      {/* 1. Header with black top utility bar and clean navbar */}
      <Header onGetStarted={() => setIsModalOpen(true)} />

      {/* 2. Hero Section matching screenshot */}
      <HeroSection
        onGetStarted={() => setIsModalOpen(true)}
        onExploreCalculator={scrollToCalculator}
      />

      {/* 3. Client Trust Logo Strip */}
      <TrustLogos />

      {/* 4. Platform Interactive Video Preview Frame */}
      <PlatformPreview onGetStarted={() => setIsModalOpen(true)} />

      {/* 5. Royal Blue "We Solve the Challenge" Section */}
      <BlueChallengeSection onGetStarted={() => setIsModalOpen(true)} />

      {/* 6. Vibrant Golden Yellow "Why Companies Choose Us" Section */}
      <YellowWhyUsSection />

      {/* 7. Interactive Calculator Section matching screenshot layout */}
      <section id="calculator-section" className="py-16 sm:py-24 bg-[#FAFAFA] border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Section Heading & Category Tabs */}
          <ServiceSelector
            selectedService={selectedService}
            onSelectService={handleSelectService}
          />

          {/* Calculator Grid */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
            {/* Left Column: Calculator Configuration Form */}
            <div className="lg:col-span-7">
              {selectedService === 'smallBusiness' ? (
                <SmallBusinessCalculator
                  values={sbValues}
                  onChange={setSbValues}
                  onReset={handleResetCurrent}
                  onChangeService={handleChangeService}
                />
              ) : (
                <PropertyManagementCalculator
                  values={pmValues}
                  onChange={setPmValues}
                  onReset={handleResetCurrent}
                  onChangeService={handleChangeService}
                />
              )}
            </div>

            {/* Right Column: Sticky Live Price Summary */}
            <div className="lg:col-span-5">
              <PriceSummary
                calculationResult={calculationResult}
                serviceName={currentServiceName}
                onRequestQuote={() => setIsModalOpen(true)}
              />
            </div>
          </div>

          {/* Software Stack Integration Component */}
          <div id="appfolio" className="mt-16 max-w-6xl mx-auto">
            <AppFolioServices />
          </div>

          {/* Badges */}
          <TrustBadges />
        </div>
      </section>

      {/* 8. Frequently Asked Questions Accordion */}
      <FaqSection />

      {/* 9. Purple "Work Without Limits" Global Reach Section */}
      <PurpleGlobalSection onGetStarted={() => setIsModalOpen(true)} />

      {/* 10. PreFooter Dark CTA Banner */}
      <PreFooterCta onGetStarted={() => setIsModalOpen(true)} />

      {/* 11. Full Mega Footer with Newsletter Signup */}
      <Footer />

      {/* 12. Interactive Quote Request Modal */}
      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={currentServiceName}
        estimatedPrice={calculationResult.total}
        breakdown={calculationResult.breakdown}
      />
    </div>
  );
}

export default App;
