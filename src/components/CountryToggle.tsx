import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CountryToggleProps {
  selectedCountry: 'germany' | 'uk';
  onCountryChange: (country: 'germany' | 'uk') => void;
}

const CountryToggle: React.FC<CountryToggleProps> = ({
  selectedCountry,
  onCountryChange,
}) => {
  return (
    <Card className="glass-card p-1 w-fit">
      <div className="flex gap-1">
        <Button
          variant={selectedCountry === 'germany' ? 'accent' : 'ghost'}
          size="sm"
          onClick={() => onCountryChange('germany')}
          className="relative"
        >
          🇩🇪 Germany
        </Button>
        <Button
          variant={selectedCountry === 'uk' ? 'accent' : 'ghost'}
          size="sm"
          onClick={() => onCountryChange('uk')}
          className="relative"
        >
          🇬🇧 UK
        </Button>
      </div>
    </Card>
  );
};

export default CountryToggle;