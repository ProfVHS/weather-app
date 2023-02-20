import React, { useState } from "react";

interface AutocompleteInputProps {
  onSelect: (arg0: string) => void;
}

function AutocompleteInput({ onSelect }: AutocompleteInputProps) {
  const [cityInput, setCityInput] = useState<string>("");
  const [isFocus, setIsFocus] = useState<boolean>();
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [maxIndex, setMaxIndex] = useState<number>(1);

  const citiesName = [
    "Slupsk",
    "Warsaw",
    "Cracow",
    "London",
    "Berlin",
    "New York",
  ];
  const setFocusableFalse = () => {
    setIsFocus(false);
    setSelectedIndex(-1);
  };
  document.addEventListener("click", () => {
    setFocusableFalse();
  });

  const keydownHandler = (
    keyCode: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    //== ON ESCAPE
    if (keyCode === 27) {
      setFocusableFalse();
    }

    //== ON ENTER
    if (keyCode === 13) {
      e.preventDefault();
      if (selectedIndex > -1) {
        document.getElementById(`${selectedIndex}autocompleteItem`)?.click();
        //DO API
        setFocusableFalse();
      } else {
        setFocusableFalse();
        console.log(cityInput);
        onSelect(cityInput);
      }
    }

    //ON ARROW DOWN
    if (keyCode === 40) {
      console.log(selectedIndex);
      setSelectedIndex(selectedIndex + 1);
      document
        .getElementById(`${selectedIndex + 1}autocompleteItem`)
        ?.classList.add("selected");
      document
        .getElementById(`${selectedIndex}autocompleteItem`)
        ?.classList.remove("selected");
      document
        .getElementById(`${selectedIndex - 1}autocompleteItem`)
        ?.classList.remove("selected");
    }

    //ON ARROW UP
    if (keyCode === 38) {
      console.log(selectedIndex);
      setSelectedIndex(selectedIndex - 1);
      document
        .getElementById(`${selectedIndex + 1}autocompleteItem`)
        ?.classList.remove("selected");
      document
        .getElementById(`${selectedIndex}autocompleteItem`)
        ?.classList.remove("selected");
      document
        .getElementById(`${selectedIndex - 1}autocompleteItem`)
        ?.classList.add("selected");
    }
  };
  return (
    <div className="autocomplete" id="autocomplete">
      <input
        className="autocomplete__cityname"
        placeholder="City"
        value={cityInput}
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
      <div className="autocomplete__list">
        {isFocus &&
          citiesName.map(
            (cityName, index: number) =>
              cityName.toLowerCase().startsWith(cityInput.toLowerCase()) && (
                <div
                  className="autocomplete__item"
                  id={`${index}autocompleteItem`}
                  onClick={() => {
                    setCityInput(cityName);
                  }}
                >
                  <span className="autocomplete__item__prefix">
                    {cityInput}
                  </span>
                  {cityName.substring(cityInput.length)}
                </div>
              )
          )}
      </div>
    </div>
  );
}

export default AutocompleteInput;
