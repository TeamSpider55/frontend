import { alpha } from '@material-ui/core/styles';

function createGradient(color1: string, color2: string) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

const PRIMARY = {
  light: '#00B2D2',
  main: '#0094AD',
  dark: '#004C5D',
};

const INFO = {
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
};

const SUCCESS = {
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
};

const WARNING = {
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
};

const ERROR = {
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const palette = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY },
  secondary: { ...PRIMARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  grey: { ...GREY },
  gradients: GRADIENTS,
  divider: GREY[500_24],
  text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
  background: { paper: '#fff', default: '#fff', neutral: GREY[200] },
  action: {
    active: GREY[600],
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default palette;
