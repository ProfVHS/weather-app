import React, { useState } from "react";
import cities from "../shared/cities";

interface AutocompleteInputProps {
  onSelect: (arg0: string) => void;
  selected: string;
}

function AutocompleteInput({ onSelect, selected }: AutocompleteInputProps) {
  const [cityInput, setCityInput] = useState<string>("");
  const [isFocus, setIsFocus] = useState<boolean>();
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [maxIndex, setMaxIndex] = useState<number>(1);

  const setFocusableFalse = () => {
    setIsFocus(false);
  };
  document.addEventListener("click", () => {
    setFocusableFalse();
  });

  const keydownHandler = (
    keyCode: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    //== ON ENTER
    if (keyCode === 13) {
      e.preventDefault();
      if (selectedIndex > -1) {
        document.getElementById(`${selectedIndex}autocompleteItem`)?.click();
        //DO API
        setFocusableFalse();
      } else {
        setFocusableFalse();
        onSelect(cityInput);
        console.log(cityInput);
      }
    }
  };
  return (
    <div className="autocomplete" id="autocomplete">
      <input
        className="autocomplete__cityname"
        placeholder="City"
        value={cityInput}
        list="cities"
        onChange={(e) => {
          setCityInput(e.target.value);
          {
            e.target.value.length > 0 ? setIsFocus(true) : setIsFocus(false);
          }
        }}
        onKeyDown={(e) => {
          keydownHandler(e.keyCode, e);
        }}
      />
      <Datalist />
    </div>
  );
}
const Datalist = React.memo(() => {
  return (
    <datalist id="cities">
      {cities.map((item, i) => (
        <option key={i} value={item.name} />
      ))}
    </datalist>
  );
});

export default AutocompleteInput;
