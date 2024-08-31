import React, { useEffect, useRef } from 'react';
import { FormField } from './FormField';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Checkbox } from '../ui/Checkbox';
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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Ramp Details</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Do you know how long of a ramp you need?
        </label>
        <div>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="knowRampLength"
              value="yes"
              checked={formData.knowRampLength === 'yes'}
              onChange={(e) => {
                console.log('Ramp length changed to:', e.target.value); // Debug log
                onChange('knowRampLength', e.target.value);
              }}
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estimatedRampLength">
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
          {errors.estimatedRampLength && <p className="text-red-500 text-xs italic">{errors.estimatedRampLength}</p>}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Do you know how long you need the ramp?
        </label>
        <div>
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="knowRentalDuration"
              value="yes"
              checked={formData.knowRentalDuration === 'yes'}
              onChange={(e) => {
                console.log('Rental duration changed to:', e.target.value); // Debug log
                onChange('knowRentalDuration', e.target.value);
              }}
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estimatedRentalDuration">
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
          {errors.estimatedRentalDuration && <p className="text-red-500 text-xs italic">{errors.estimatedRentalDuration}</p>}
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">How soon do you need it installed?</label>
        <Select
          name="installationTimeframe"
          value={formData.installationTimeframe}
          onChange={(e) => onChange('installationTimeframe', e.target.value)}
        >
          <option value="">Select timeframe</option>
          <option value="Immediately">Immediately</option>
          <option value="Within a week">Within a week</option>
          <option value="Within two weeks">Within two weeks</option>
          <option value="Within a month">Within a month</option>
          <option value="No rush">No rush</option>
        </Select>
        {errors.installationTimeframe && <p className="text-red-500 text-xs italic">{errors.installationTimeframe}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Mobility aids to be used with the ramp</label>
        {['Wheelchair', 'Motorized scooter', 'Walker/cane', 'None'].map((aid) => (
          <div key={aid}>
            <label className="inline-flex items-center">
              <Checkbox
                name="mobilityAids"
                value={aid}
                checked={formData.mobilityAids.includes(aid)}
                onCheckedChange={(checked) => {
                  const newMobilityAids = checked
                    ? [...formData.mobilityAids, aid]
                    : formData.mobilityAids.filter((item) => item !== aid);
                  onChange('mobilityAids', newMobilityAids);
                }}
              />
              <span className="ml-2">{aid}</span>
            </label>
          </div>
        ))}
        {errors.mobilityAids && <p className="text-red-500 text-xs italic">{errors.mobilityAids}</p>}
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
      <div className="flex items-center justify-between">
        <Button type="button" onClick={onPrevPage} variant="secondary">
          Previous
        </Button>
        <Button type="submit" disabled={isSubmitting} onClick={onSubmit}>
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </Button>
      </div>
    </div>
  );
};