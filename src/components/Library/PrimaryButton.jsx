import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function PrimaryButton() {
  return (
    <Stack direction="row" spacing={2}>
      {/* Primary button with white text */}
      <Button variant="contained" color="primary">
        Primary Button
      </Button>
      {/* Disabled button */}
      <Button variant="contained" disabled>
        Disabled
      </Button>
      {/* Link button with white text */}
      <Button variant="contained" color="primary" href="#contained-buttons">
        Link
      </Button>
    </Stack>
  );
}
