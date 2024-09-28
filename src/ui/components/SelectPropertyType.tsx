import styled from "styled-components";
import { PropertyType } from "../../models/property";
import { MenuItem, TextField } from "@mui/material";
import { getPropertyTypeNameByType } from "../../helpers";

type PropertiesTypes = Array<
  {
    value: PropertyType,
    label: string
  }
>

const propertiesTypes: PropertiesTypes = [
  {
    value: "APARTMENT",
    label: getPropertyTypeNameByType("APARTMENT")
  },
  {
    value: "HOUSE",
    label: getPropertyTypeNameByType("HOUSE")
  },
  {
    value: "SEMIFLOOR",
    label: getPropertyTypeNameByType("SEMIFLOOR")
  },
  {
    value: "FLOOR",
    label: getPropertyTypeNameByType("FLOOR")
  },
  {
    value: "DUPLEX",
    label: getPropertyTypeNameByType("DUPLEX")
  },
  {
    value: "TRIPLEX",
    label: getPropertyTypeNameByType("TRIPLEX")
  },
  {
    value: "PENTHOUSE",
    label: getPropertyTypeNameByType("PENTHOUSE")
  }
];

const Select = styled(TextField)`
  & .MuiInputBase-root {
    background-color: #fefefe;
  }
`;

interface SelectPropertyTypeProps {
  selectedPropertyType: PropertyType,
  setSelectedPropertyType: (propertyType: PropertyType) => void
}

const SelectPropertyType = ({ selectedPropertyType, setSelectedPropertyType }: SelectPropertyTypeProps) => {
  return (
    <Select
      id="select-tipo-inmueble"
      size="small"
      select
      value={selectedPropertyType}
      onChange={(e) => setSelectedPropertyType(e.target.value as PropertyType)}
      sx={{
        "& .MuiInputBase-input": {
          py: 0.75, fontSize: "0.875rem"
        }
      }}
    >
      {propertiesTypes.map((propertiesType) => (
        <MenuItem key={propertiesType.value} value={propertiesType.value}>
          {propertiesType.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectPropertyType;
