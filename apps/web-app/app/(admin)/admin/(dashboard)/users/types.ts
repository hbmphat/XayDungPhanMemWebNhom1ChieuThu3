export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  lastActive: string;
  avatar: string;
}

export const USERS: User[] = [
  { id: "1", name: "Jane Cooper", email: "jane.cooper@example.com", role: "Administrator", status: "Active", lastActive: "2 minutes ago", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkSxU25XtKH_xqKskv134MY2wlaxp-yxOoP-0HdVfHt7xq2_DlF5tEMQ4TTJxCdomCPdEZxSzQtTTTGzncWnBGP8MlF04uajcrbT_Agh5Oww9EO5CRalkJXm3Y4WhP-JS6Haa1fkethpdeduF2lRbz9F5rfTPs5zo6npqhQu5slCRTT4oUAmyJC8pI96qjqEHU7Y14PJkKFJp2fnGoATaDPmI_31t735EGnWW5yWN3jkx0CdGmYyX90qE8hwn_o7pyZnnl1A66lXXM" },
  { id: "2", name: "Robert Fox", email: "robert.fox@example.com", role: "Editor", status: "Active", lastActive: "1 hour ago", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9bfVVf4cDOOSxue_GvRz_Yi3kIlsjJ2Skt12oYlY3IoeDqizFVJiN17Uclu_IUWJ74Ei12mXeuaHk2ljQPsJ84OnObRgFGnakF8v6JMyWzrBY0hfU-kDUmZ0t_i0frmtfJsqhGfcz7V0Xz8fP-Hsfov7y4hGXK5Ze2fc4GeY0oR-SEFYizq3150_ajyyEbztm3ld9IvTmyhzRNTuMbHkTSxrKRJunOFw6ZgjjHj1QuryabQm1JNyCZlhHIsutL5a697dcl9XFYjg9" },
  { id: "3", name: "Arlene McCoy", email: "arlene.mccoy@example.com", role: "Subscriber", status: "Inactive", lastActive: "3 days ago", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQjeZMlXBEuJVdi8M_fJ5tAdXafclzSddewSUCoWBlQartBZskfuaL9Bfhy4pvtwQio5yituF-tkn1i2q_m-U-Fs80HwHBG2ANaRNgT46cQOoUbFZVsUuTPvJi0IL3w3EVWJETB0vY5CNKqXdDWI8tmUpXb6UgBj1xscE6PzFXuat3XOnIUye4Fmy7EJDLljHlG1VEPVGJLPzC9N-noc54m0SpCAR3YhN0Uh3gJQCwRA-kf02NIvwk8iQLoQZ63-MpoWWUd3QY76zi" },
  { id: "4", name: "Esther Howard", email: "esther.howard@example.com", role: "Moderator", status: "Pending", lastActive: "Never", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7iu-Oe89TLaVsW-yHhZgWLmoiiynKGZOuFzHFtrNmKzi1L33TMy1BT2ALBaOKHS9--dj2sNB7JlHxcfDsFhCKwO0UqQQNF2DGf01Tk9imM5pmG0XdKIX8_OkRGKC7MUs12nLbQSAHwJ5IPvWD1kMHIPd6wD1ecIe94VNPEDf7jwzQ0gGPvWs8imkLPbx-K5HGeHDO8rkcNADY3nZyKIxs1_mv4gFGjKHPh5fDGR_dViO9_Z4vCyNPAN6Vni0vSYFFiJrUV7mXRhhE" },
  { id: "5", name: "Tèo", email: "teo.tranvan@example.com", role: "User", status: "Active", lastActive: "5 minutes ago", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7iu-Oe89TLaVsW-yHhZgWLmoiiynKGZOuFzHFtrNmKzi1L33TMy1BT2ALBaOKHS9--dj2sNB7JlHxcfDsFhCKwO0UqQQNF2DGf01Tk9imM5pmG0XdKIX8_OkRGKC7MUs12nLbQSAHwJ5IPvWD1kMHIPd6wD1ecIe94VNPEDf7jwzQ0gGPvWs8imkLPbx-K5HGeHDO8rkcNADY3nZyKIxs1_mv4gFGjKHPh5fDGR_dViO9_Z4vCyNPAN6Vni0vSYFFiJrUV7mXRhhE" },
  { id: "6", name: "Tys", email: "tys.banhvan@example.com", role: "Editor", status: "Active", lastActive: "5 minutes ago", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7iu-Oe89TLaVsW-yHhZgWLmoiiynKGZOuFzHFtrNmKzi1L33TMy1BT2ALBaOKHS9--dj2sNB7JlHxcfDsFhCKwO0UqQQNF2DGf01Tk9imM5pmG0XdKIX8_OkRGKC7MUs12nLbQSAHwJ5IPvWD1kMHIPd6wD1ecIe94VNPEDf7jwzQ0gGPvWs8imkLPbx-K5HGeHDO8rkcNADY3nZyKIxs1_mv4gFGjKHPh5fDGR_dViO9_Z4vCyNPAN6Vni0vSYFFiJrUV7mXRhhE" },
];