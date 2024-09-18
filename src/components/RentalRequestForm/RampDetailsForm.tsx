import React, { useEffect, useRef } from 'react';
import { FormField } from './FormField';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Spinner } from '../ui/Spinner';
import { RentalRequestFormData, FormErrors, FormChangeHandler } from './types';
import { loadGoogleMapsAPI } from '../../utils/googleMapsLoader';

interface RampDetailsFormProps {
  formData: RentalRequestFormData;
  errors: FormErrors;
  onChange: FormChangeHandler;
  onPrevPage: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export const RampDetailsForm: React.FC<RampDetailsFormProps> = ({
  formData,
  errors,
  onChange,
  onPrevPage,
  onSubmit,
  isSubmitting,
}) => {
  const addressInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadGoogleMapsAPI().then(() => {
      if (window.google && addressInputRef.current) {
        const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
          types: ['address'],
          componentRestrictions: { country: 'us' },
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place.formatted_address) {
            onChange('installAddress', place.formatted_address);
          }
        });
      }
    }).catch(error => {
      console.error('Error loading Google Maps API:', error);
    });
  }, [onChange]);

  const handleMobilityAidChange = (aid: string) => {
    const newMobilityAids = formData.mobilityAids.includes(aid)
      ? formData.mobilityAids.filter(item => item !== aid)
      : [...formData.mobilityAids, aid];
    onChange('mobilityAids', newMobilityAids);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Ramp Details</h2>
      
      <div className="space-y-2">
        <label className="form-label">
          Do you know the required ramp length?
        </label>
        <div className="space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="knowRampLength"
              value="yes"
              checked={formData.knowRampLength === 'yes'}
              onChange={(e) => onChange('knowRampLength', e.target.value)}
              className="form-radio"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="knowRampLength"
              value="no"
              checked={formData.knowRampLength === 'no'}
              onChange={(e) => onChange('knowRampLength', e.target.value)}
              className="form-radio"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>
      
      {formData.knowRampLength === 'yes' && (
        <div className="mb-4">
          <label className="form-label" htmlFor="estimatedRampLength">
            Estimated ramp length required (in feet)
          </label>
          <Input
            type="number"
            name="estimatedRampLength"
            id="estimatedRampLength"
            value={formData.estimatedRampLength}
            onChange={(e) => onChange('estimatedRampLength', e.target.value)}
            min="4"
            max="60"
            step="1"
          />
          {errors.estimatedRampLength && <p className="form-error">{errors.estimatedRampLength}</p>}
        </div>
      )}

      <div className="mb-4">
        <label className="form-label">
          Do you know the duration of the rental?
        </label>
        <div className="space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="knowRentalDuration"
              value="yes"
              checked={formData.knowRentalDuration === 'yes'}
              onChange={(e) => onChange('knowRentalDuration', e.target.value)}
              className="form-radio"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="knowRentalDuration"
              value="no"
              checked={formData.knowRentalDuration === 'no'}
              onChange={(e) => onChange('knowRentalDuration', e.target.value)}
              className="form-radio"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>

      {formData.knowRentalDuration === 'yes' && (
        <div className="mb-4">
          <label className="form-label" htmlFor="estimatedRentalDuration">
            Estimated rental duration (in months)
          </label>
          <Input
            type="number"
            name="estimatedRentalDuration"
            id="estimatedRentalDuration"
            value={formData.estimatedRentalDuration}
            onChange={(e) => onChange('estimatedRentalDuration', e.target.value)}
            min="1"
            max="72"
            step="1"
          />
          {errors.estimatedRentalDuration && <p className="form-error">{errors.estimatedRentalDuration}</p>}
        </div>
      )}
      <div className="mb-4">
        <label className="form-label">How soon do you need it installed?</label>
        <Select
          name="installationTimeframe"
          value={formData.installationTimeframe}
          onChange={(e) => onChange('installationTimeframe', e.target.value)}
        >
          <option value="">Select timeframe</option>
          <option value="Within 24 hours">Within 24 hours</option>
          <option value="Within 2 days">Within 2 days</option>
          <option value="Within 3 days">Within 3 days</option>
          <option value="Within 1 week">Within 1 week</option>
          <option value="Over 1 week">Over 1 week</option>
        </Select>
        {errors.installationTimeframe && <p className="form-error">{errors.installationTimeframe}</p>}
      </div>
      <div className="mb-4">
        <label className="form-label">Mobility aids to be used with the ramp</label>
        <div className="space-y-3">
          {['Wheelchair', 'Motorized scooter', 'Walker/cane', 'None'].map((aid) => (
            <label key={aid} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.mobilityAids.includes(aid)}
                onChange={() => handleMobilityAidChange(aid)}
                className="form-checkbox"
              />
              <span className="ml-3 text-input">
                {aid}
              </span>
            </label>
          ))}
        </div>
        {errors.mobilityAids && <p className="form-error">{errors.mobilityAids}</p>}
      </div>
      <FormField
        label="Installation Address"
        name="installAddress"
        value={formData.installAddress}
        onChange={(e) => onChange('installAddress', e.target.value)}
        error={errors.installAddress}
        required
        ref={addressInputRef}
        placeholder="Start typing an address..."
      />
      <div className="mt-8 space-y-4">
        <Button 
          type="submit" 
          disabled={isSubmitting} 
          onClick={onSubmit}
          className="btn btn-primary w-full"
        >
          {isSubmitting ? <Spinner /> : 'Submit Request'}
        </Button>
        <div className="flex justify-center">
          <button 
            type="button" 
            onClick={onPrevPage} 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Previous
          </button>
        </div>
      </div>
    </div>
  );
};