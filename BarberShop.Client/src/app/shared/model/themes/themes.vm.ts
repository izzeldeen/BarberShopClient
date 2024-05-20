import {EntityBase} from "../entity-base.vm";

export class ThemeVm extends EntityBase {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  light: string;
  dark: string;
  companyName: string;
  projectName: string;
  logo: any;
  sideBarLogoAr: any;
  sideBarLogoEn: any;
  sideBarLogoWidthAr: any;
  sideBarLogoWidthEn: any;
  loginBackground: string;
  loginLogo: string;
  boxLoginColor: string;
  menuBackgroundColor: string;
  bodyContectBackgroundColor: string;
  loddingImage: string;
  loginLogoWidth: string;
  merchantCode: string;
  code: string;
  title: string;
  entityCode: any

  constructor() {
    super();
    this.primary = "#1EAAE7",
      this.secondary = "#AC39D4",
      this.success = "#2BC155",
      this.info = "#461EE7",
      this.warning = "#FE8024",
      this.danger = "#FF2E2E",
      this.light = "#F4F5F9",
      this.dark = "#B1B1B1",
      this.companyName = "ATB",
      this.projectName = "Refund Portal",
      this.loginBackground = "assets/images/loginBg.png",
      this.sideBarLogoAr = "assets/images/ATB_Color_logo.png",
      this.sideBarLogoEn = "assets/images/ATB_Color_logo.png",
      this.sideBarLogoWidthAr = "150px",
      this.sideBarLogoWidthEn = "150px",
      this.loginLogo = "assets/images/ATB_Color_logo.png",
      this.boxLoginColor = "rgba(255, 255, 255 , 029)",
      this.menuBackgroundColor = "#fff",
      this.bodyContectBackgroundColor = "#fff",
      this.loddingImage = "assets/images/atb_loading.gif",
      this.loginLogoWidth = "150px",
      this.code = "atb",
      this.title = "Template | ATB"

  }

}
