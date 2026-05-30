import React, { useState } from 'react';
import Select from 'react-select';

const SymptomDropdown = ({ setSuggestions }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState(null);

  const symptoms = [
    { label: 'Fever', value: 'fever' },
    { label: 'High Fever', value: 'high_fever' },
    { label: 'Low Fever', value: 'low_fever' },
    { label: 'Cough', value: 'cough' },
    { label: 'Dry Cough', value: 'dry_cough' },
    { label: 'Wet Cough', value: 'wet_cough' },
    { label: 'Sore Throat', value: 'sore_throat' },
    { label: 'Headache', value: 'headache' },
    { label: 'Body Pain', value: 'body_pain' },
    { label: 'Muscle Pain', value: 'muscle_pain' },
    { label: 'Joint Pain', value: 'joint_pain' },
    { label: 'Nausea', value: 'nausea' },
    { label: 'Vomiting', value: 'vomiting' },
    { label: 'Diarrhea', value: 'diarrhea' },
    { label: 'Fatigue', value: 'fatigue' },
    { label: 'Weakness', value: 'weakness' },
    { label: 'Dizziness', value: 'dizziness' },
    { label: 'Shortness of Breath', value: 'shortness_of_breath' },
    { label: 'Chest Pain', value: 'chest_pain' },
    { label: 'Palpitations', value: 'palpitations' },
    { label: 'Abdominal Pain', value: 'abdominal_pain' },
    { label: 'Loss of Appetite', value: 'loss_of_appetite' },
    { label: 'Loss of Taste', value: 'loss_of_taste' },
    { label: 'Loss of Smell', value: 'loss_of_smell' },
    { label: 'Congestion', value: 'congestion' },
    { label: 'Runny Nose', value: 'runny_nose' },
    { label: 'Sneezing', value: 'sneezing' },
    { label: 'Itchy Eyes', value: 'itchy_eyes' },
    { label: 'Watery Eyes', value: 'watery_eyes' },
    { label: 'Blurred Vision', value: 'blurred_vision' },
    { label: 'Rash', value: 'rash' },
    { label: 'Itching', value: 'itching' },
    { label: 'Swelling', value: 'swelling' },
    { label: 'Burning Sensation', value: 'burning_sensation' },
    { label: 'Numbness', value: 'numbness' },
    { label: 'Tingling Sensation', value: 'tingling_sensation' },
    { label: 'Chills', value: 'chills' },
    { label: 'Night Sweats', value: 'night_sweats' },
    { label: 'Cold Sweats', value: 'cold_sweats' },
    { label: 'Hot Flashes', value: 'hot_flashes' },
    { label: 'Anxiety', value: 'anxiety' },
    { label: 'Depression', value: 'depression' },
    { label: 'Confusion', value: 'confusion' },
    { label: 'Memory Loss', value: 'memory_loss' },
    { label: 'Difficulty Sleeping', value: 'difficulty_sleeping' },
    { label: 'Restlessness', value: 'restlessness' },
    { label: 'Tremors', value: 'tremors' },
    { label: 'Seizures', value: 'seizures' },
    { label: 'Hallucinations', value: 'hallucinations' },
    { label: 'Fainting', value: 'fainting' },
    { label: 'Bleeding', value: 'bleeding' },
    { label: 'Bruising', value: 'bruising' },
    { label: 'Swollen Lymph Nodes', value: 'swollen_lymph_nodes' },
    { label: 'Yellowing of Skin', value: 'yellowing_of_skin' },
    { label: 'Dark Urine', value: 'dark_urine' },
    { label: 'Light-Colored Stool', value: 'light_colored_stool' },
    { label: 'Frequent Urination', value: 'frequent_urination' },
    { label: 'Painful Urination', value: 'painful_urination' },
    { label: 'Blood in Urine', value: 'blood_in_urine' },
    { label: 'Back Pain', value: 'back_pain' },
    { label: 'Neck Pain', value: 'neck_pain' },
    { label: 'Earache', value: 'earache' },
    { label: 'Hearing Loss', value: 'hearing_loss' },
    { label: 'Ringing in Ears', value: 'ringing_in_ears' },
    { label: 'Hoarseness', value: 'hoarseness' },
    { label: 'Difficulty Swallowing', value: 'difficulty_swallowing' },
    { label: 'Wheezing', value: 'wheezing' },
    { label: 'Rapid Breathing', value: 'rapid_breathing' },
    { label: 'Slow Breathing', value: 'slow_breathing' },
    { label: 'Fever Chills', value: 'fever_chills' }
  ];

  const handleChange = (selectedOptions) => {
    setSelectedSymptoms(selectedOptions);
    setSuggestions(selectedOptions.map(option => option.label).join(', '));
  };

  return (
    <div>
      <label htmlFor="symptoms">What symptoms are you experiencing today?</label>
      <Select
        id="symptoms"
        value={selectedSymptoms}
        onChange={handleChange}
        options={symptoms}
        isMulti
        placeholder="Select your symptoms..."
        styles={selectStyles}
      />
    </div>
  );
};

const selectStyles = {
  control: (provided) => ({
    ...provided,
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  }),
};

export default SymptomDropdown;
