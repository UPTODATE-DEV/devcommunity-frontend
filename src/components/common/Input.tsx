import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

interface Props {
  icon?: any;
  placeholder: string;
  label?: string;
  name: string;
  rows?: number;
  type?: string;
  value?: string | number;
  isPassword?: boolean;
  handleChange?(event: { target: { value: string; name: string } } | string | null): void;
}

const Input: React.FC<Props> = ({
  icon,
  placeholder,
  label,
  rows = 4,
  isPassword = false,
  name,
  type = "text",
  handleChange,
  value,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Stack sx={{ width: 1, position: "relative" }} spacing={1}>
      <Typography>{label}</Typography>
      <Paper
        variant="outlined"
        sx={{
          px: 2,
          py: 0.9,
          borderRadius: 1,
          width: 1,
          transition: (theme) => theme.transitions.create(["border-color", "box-shadow"]),
          "&:hover": {
            borderColor: (theme) => theme.palette.primary.main,
            bgcolor: "action.hover",
          },
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          {icon}
          <InputBase
            placeholder={placeholder}
            sx={{ width: 1 }}
            name={name}
            type={showPassword ? "text" : type}
            inputProps={{
              min: 1,
            }}
            {...(isPassword && {
              endAdornment: (
                <IconButton sx={{ p: 0.5 }} onClick={toggleShowPassword}>
                  {showPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                </IconButton>
              ),
            })}
            value={value}
            multiline={type === "textarea" ? true : false}
            {...((type = "textarea") && {
              rows,
            })}
            onChange={handleChange}
          />
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Input;
