import { useState, useRef, useEffect } from "react";

// ── Color Tokens ──────────────────────────────────────────────────────────────
function getTokens(theme = "light", accentHue = "green") {
  const hue = accentHue === "gold" ? 82 : 155;
  const dark = theme === "deep";
  return {
    sidebarBg: dark ? "oklch(22% 0.08 155)" : "#ffffff",
    sidebarText: dark ? "oklch(90% 0.04 155)" : "oklch(35% 0.06 155)",
    sidebarActive: dark ? "oklch(30% 0.10 155)" : `oklch(95% 0.05 ${hue})`,
    sidebarActiveText: dark ? "#ffffff" : `oklch(28% 0.12 ${hue})`,
    sidebarMuted: dark ? "oklch(60% 0.05 155)" : "oklch(58% 0.05 155)",
    sidebarBorder: dark ? "oklch(32% 0.06 155)" : "oklch(91% 0.012 155)",
    accent: `oklch(36% 0.13 ${hue})`,
    accentLight: `oklch(95% 0.06 ${hue})`,
    accentMid: `oklch(55% 0.12 ${hue})`,
    accentBtn: `oklch(38% 0.13 ${hue})`,
    danger: "oklch(50% 0.15 20)",
    dangerLight: "oklch(97% 0.04 20)",
    dangerBorder: "oklch(88% 0.07 20)",
    success: "oklch(42% 0.14 155)",
    successLight: "oklch(96% 0.05 155)",
    bg: "oklch(97.5% 0.007 80)",
    surface: "#ffffff",
    border: "oklch(91% 0.015 155)",
    text: "oklch(22% 0.04 155)",
    textMuted: "oklch(55% 0.04 155)",
    textLight: "oklch(70% 0.03 155)",
    shadow: "0 1px 3px oklch(0% 0 0 / 0.06), 0 4px 12px oklch(0% 0 0 / 0.04)",
    shadowMd: "0 2px 8px oklch(0% 0 0 / 0.08), 0 8px 24px oklch(0% 0 0 / 0.06)",
  };
}

function getAdminTokens(accentHue = 310, sidebarStyle = "dark", density = "compact") {
  const h = accentHue;
  const dark = sidebarStyle === "dark";
  return {
    bg: `oklch(97% 0.006 ${h})`,
    surface: "#ffffff",
    border: `oklch(91% 0.012 ${h})`,
    text: `oklch(20% 0.04 ${h})`,
    textMuted: `oklch(52% 0.04 ${h})`,
    textLight: `oklch(70% 0.03 ${h})`,
    accent: `oklch(35% 0.13 ${h})`,
    accentLight: `oklch(95% 0.05 ${h})`,
    accentMid: `oklch(52% 0.12 ${h})`,
    accentBtn: `oklch(38% 0.13 ${h})`,
    danger: "oklch(50% 0.15 20)",
    dangerLight: "oklch(97% 0.04 20)",
    dangerBorder: "oklch(88% 0.07 20)",
    success: "oklch(42% 0.14 155)",
    successLight: "oklch(96% 0.05 155)",
    shadow: "0 1px 3px oklch(0% 0 0 / 0.06), 0 4px 12px oklch(0% 0 0 / 0.04)",
    shadowMd: "0 2px 8px oklch(0% 0 0 / 0.08), 0 8px 24px oklch(0% 0 0 / 0.06)",
    sidebarBg: dark ? `oklch(18% 0.06 ${h})` : "#ffffff",
    sidebarText: dark ? `oklch(92% 0.03 ${h})` : `oklch(22% 0.04 ${h})`,
    sidebarMuted: dark ? `oklch(56% 0.05 ${h})` : `oklch(58% 0.05 ${h})`,
    sidebarActive: dark ? `oklch(28% 0.09 ${h})` : `oklch(95% 0.06 ${h})`,
    sidebarActiveText: dark ? "white" : `oklch(28% 0.12 ${h})`,
    sidebarBorder: dark ? `oklch(28% 0.05 ${h})` : `oklch(91% 0.012 ${h})`,
    pad: density === "compact" ? "20px 24px" : "32px 36px",
    cardPad: density === "compact" ? "14px 18px" : "20px 22px",
  };
}

// ── Avatar Colors ─────────────────────────────────────────────────────────────
const avatarColors = {
  JA: "oklch(36% 0.13 155)", AO: "oklch(36% 0.12 220)", KM: "oklch(36% 0.12 30)",
  AB: "oklch(36% 0.12 300)", KD: "oklch(36% 0.12 55)", EA: "oklch(36% 0.12 180)",
  NS: "oklch(36% 0.12 310)", YB: "oklch(36% 0.12 200)", A: "oklch(36% 0.12 270)",
};

// ── Data ──────────────────────────────────────────────────────────────────────
const menteeData = {
  name: "Joanita Amegashie", title: "Digital Marketing Strategist & Founder", avatar: "JA",
  mentors: [
    { id: 1, name: "Dr. Abena Osei", role: "Brand Strategy", avatar: "AO", online: true },
    { id: 2, name: "Kwame Mensah", role: "Business Growth", avatar: "KM", online: false },
    { id: 3, name: "Ama Boateng", role: "Leadership & Impact", avatar: "AB", online: true },
  ]
};
const mentorData = {
  name: "Dr. Abena Osei", title: "Brand Strategy Mentor", avatar: "AO",
  mentees: [
    { id: 1, name: "Joanita Amegashie", role: "Digital Marketing", avatar: "JA", online: true, progress: 72 },
    { id: 2, name: "Kofi Darko", role: "Social Media", avatar: "KD", online: false, progress: 45 },
    { id: 3, name: "Efua Asante", role: "Content Strategy", avatar: "EA", online: true, progress: 88 },
  ]
};

const sessions = [
  { id: 1, title: "Brand Voice Workshop", mentor: "Dr. Abena Osei", date: "Tue, May 6", time: "10:00 AM", duration: "60 min", type: "video", status: "upcoming" },
  { id: 2, title: "Q2 Growth Review", mentor: "Kwame Mensah", date: "Thu, May 8", time: "3:00 PM", duration: "45 min", type: "video", status: "upcoming" },
  { id: 3, title: "Digital Strategy Deep Dive", mentor: "Dr. Abena Osei", date: "Mon, May 12", time: "11:00 AM", duration: "90 min", type: "in-person", status: "upcoming" },
  { id: 4, title: "GIVE Programme Planning", mentor: "Ama Boateng", date: "Fri, Apr 25", time: "2:00 PM", duration: "60 min", type: "video", status: "completed" },
  { id: 5, title: "Ravvis Media Roadmap", mentor: "Kwame Mensah", date: "Tue, Apr 22", time: "9:00 AM", duration: "45 min", type: "video", status: "completed" },
];

const goals = [
  { id: 1, title: "Launch Madam Digital Cohort 4", category: "Business", progress: 65, dueDate: "Jun 30", mentor: "Dr. Abena Osei", milestones: ["Curriculum finalised", "Registration open", "Marketing live", "Cohort launched"], completed: 2 },
  { id: 2, title: "Grow GIVE Programme to 500 participants", category: "Community", progress: 72, dueDate: "Dec 31", mentor: "Ama Boateng", milestones: ["Partnerships secured", "Pilot complete", "Scale to 3 regions", "500 participants"], completed: 3 },
  { id: 3, title: "Publish Digital Marketing Playbook", category: "Thought Leadership", progress: 30, dueDate: "Sep 1", mentor: "Dr. Abena Osei", milestones: ["Outline done", "3 chapters written", "Full draft", "Published"], completed: 1 },
  { id: 4, title: "Build Ravvis Media to 10-person team", category: "Business", progress: 40, dueDate: "Dec 31", mentor: "Kwame Mensah", milestones: ["Hire 2 creatives", "Hire ops lead", "Hire 2 more", "10-person team"], completed: 2 },
];

const messages = [
  { id: 1, from: "Dr. Abena Osei", avatar: "AO", preview: "The framework you shared for the workshop is solid. Let's refine the storytelling section before Tuesday.", time: "10:24 AM", unread: 2 },
  { id: 2, from: "Kwame Mensah", avatar: "KM", preview: "Great progress on the Q2 numbers! I want to revisit the pricing strategy — I have some thoughts.", time: "Yesterday", unread: 0 },
  { id: 3, from: "Ama Boateng", avatar: "AB", preview: "Loved how you ran the GIVE session. Can we do a reflection before the next one?", time: "Mon", unread: 1 },
];

const chatMessages = [
  { id: 1, sender: "Dr. Abena Osei", avatar: "AO", text: "Hi Joanita! I've been reviewing the materials you sent for the brand voice workshop.", time: "9:48 AM", mine: false },
  { id: 2, sender: "me", avatar: "JA", text: "Thanks for looking through! I tried to incorporate what we discussed about the Madam Digital tone.", time: "9:51 AM", mine: true },
  { id: 3, sender: "Dr. Abena Osei", avatar: "AO", text: "The framework you shared is solid. The distinction between 'educate' and 'empower' as brand modes is very sharp.", time: "10:02 AM", mine: false },
  { id: 4, sender: "Dr. Abena Osei", avatar: "AO", text: "Let's refine the storytelling section before Tuesday. I think we can make it more personal — draw from your actual journey.", time: "10:04 AM", mine: false },
  { id: 5, sender: "me", avatar: "JA", text: "Yes! I was actually thinking the same thing. Would it be okay to weave in the GIVE story there?", time: "10:12 AM", mine: true },
  { id: 6, sender: "Dr. Abena Osei", avatar: "AO", text: "Absolutely. That story reframes what 'repositioning' means — it's perfect for your audience.", time: "10:24 AM", mine: false },
];

const resources = [
  { id: 1, title: "Brand Voice Framework v2", type: "doc", mentor: "Dr. Abena Osei", date: "Apr 28", size: "245 KB", tags: ["Branding", "Workshop"] },
  { id: 2, title: "Q2 Growth Metrics Template", type: "sheet", mentor: "Kwame Mensah", date: "Apr 20", size: "88 KB", tags: ["Growth", "Analytics"] },
  { id: 3, title: "GIVE Programme Impact Report", type: "pdf", mentor: "Ama Boateng", date: "Apr 15", size: "1.2 MB", tags: ["GIVE", "Community"] },
  { id: 4, title: "Storytelling for Entrepreneurs", type: "pdf", mentor: "Dr. Abena Osei", date: "Apr 10", size: "320 KB", tags: ["Storytelling", "Branding"] },
  { id: 5, title: "Digital Marketing Playbook Outline", type: "doc", mentor: "Me", date: "Apr 5", size: "112 KB", tags: ["Playbook", "Draft"] },
  { id: 6, title: "Ravvis Media 2025 Roadmap", type: "sheet", mentor: "Kwame Mensah", date: "Mar 28", size: "156 KB", tags: ["Business", "Strategy"] },
];

const orgMembers = {
  mentors: [
    { id: 1, name: "Dr. Abena Osei", role: "Brand Strategy", avatar: "AO", online: true, mentees: 3, sessions: 12 },
    { id: 2, name: "Kwame Mensah", role: "Business Growth", avatar: "KM", online: false, mentees: 2, sessions: 8 },
    { id: 3, name: "Ama Boateng", role: "Leadership & Impact", avatar: "AB", online: true, mentees: 4, sessions: 15 },
  ],
  mentees: [
    { id: 1, name: "Joanita Amegashie", role: "Digital Marketing", avatar: "JA", online: true, mentor: "Dr. Abena Osei", progress: 72 },
    { id: 2, name: "Kofi Darko", role: "Social Media", avatar: "KD", online: false, mentor: "Kwame Mensah", progress: 45 },
    { id: 3, name: "Efua Asante", role: "Content Strategy", avatar: "EA", online: true, mentor: "Dr. Abena Osei", progress: 88 },
    { id: 4, name: "Nana Ama Sarpong", role: "Brand Design", avatar: "NS", online: false, mentor: "Ama Boateng", progress: 60 },
    { id: 5, name: "Yaw Boadu", role: "E-Commerce", avatar: "YB", online: true, mentor: "Unassigned", progress: 0 },
  ]
};

const initPending = [
  { id: 1, name: "Accra Business School", industry: "Education", email: "admin@accrabiz.edu.gh", applied: "Apr 28, 2026", mentors: 5, mentees: 20, country: "Ghana", website: "accrabiz.edu.gh", about: "Ghana's leading business school providing mentorship for students and alumni." },
  { id: 2, name: "TechBridge Ghana", industry: "Tech & Startups", email: "team@techbridge.gh", applied: "Apr 27, 2026", mentors: 3, mentees: 12, country: "Ghana", website: "techbridge.gh", about: "Connecting tech professionals with young developers across the country." },
  { id: 3, name: "Young Leaders Africa", industry: "NGO & Leadership", email: "info@yla.org", applied: "Apr 25, 2026", mentors: 8, mentees: 35, country: "Nigeria", website: "yla.org", about: "Pan-African leadership programme for young professionals aged 18–30." },
  { id: 4, name: "She Leads Kumasi", industry: "Women in Business", email: "hello@shelkumasi.org", applied: "Apr 24, 2026", mentors: 4, mentees: 18, country: "Ghana", website: "sheleadskumasi.org", about: "Empowering women entrepreneurs in the Ashanti region." },
];

const initApproved = [
  { id: 10, name: "Ravvis Media", industry: "Digital Marketing", members: 8, sessions: 34, code: "RAVI42", country: "Ghana", joined: "Jan 2026", status: "active" },
  { id: 11, name: "GIVE Programme", industry: "Education & Vocational", members: 12, sessions: 61, code: "GIVE18", country: "Ghana", joined: "Feb 2026", status: "active" },
  { id: 12, name: "Madam Digital", industry: "Women in Tech", members: 6, sessions: 22, code: "MADA55", country: "Ghana", joined: "Mar 2026", status: "active" },
  { id: 13, name: "Volta Ventures", industry: "Entrepreneurship", members: 5, sessions: 9, code: "VOLT31", country: "Ghana", joined: "Apr 2026", status: "suspended" },
];

const allUsers = [
  { id:1, name:"Joanita Amegashie", role:"Mentor", org:"Ravvis Media", email:"joanita@ravvismedia.com", joined:"Jan 2026", active: true },
  { id:2, name:"Dr. Abena Osei", role:"Mentor", org:"Ravvis Media", email:"abena@ravvismedia.com", joined:"Jan 2026", active: true },
  { id:3, name:"Kofi Darko", role:"Mentee", org:"Ravvis Media", email:"kofi@gmail.com", joined:"Feb 2026", active: true },
  { id:4, name:"Efua Asante", role:"Mentee", org:"GIVE Programme", email:"efua@yla.org", joined:"Feb 2026", active: false },
  { id:5, name:"Ama Boateng", role:"Mentor", org:"Madam Digital", email:"ama@madamdigital.com", joined:"Mar 2026", active: true },
  { id:6, name:"Kwame Mensah", role:"Mentor", org:"Madam Digital", email:"kwame@madamdigital.com", joined:"Mar 2026", active: true },
  { id:7, name:"Nana Ama Sarpong", role:"Mentee", org:"GIVE Programme", email:"nana@give.org", joined:"Mar 2026", active: true },
  { id:8, name:"Yaw Boadu", role:"Mentee", org:"Ravvis Media", email:"yaw@gmail.com", joined:"Apr 2026", active: false },
];

// ── Shared Primitives ─────────────────────────────────────────────────────────
const Avatar = ({ initials, size = 36, color, style: extStyle = {} }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: color || avatarColors[initials] || "oklch(36% 0.13 155)",
    color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: size * 0.35, fontWeight: 700, flexShrink: 0, letterSpacing: "0.02em",
    ...extStyle
  }}>{initials}</div>
);

const Badge = ({ label, color, bg, T }) => (
  <span style={{
    fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 99,
    background: bg || (T ? T.accentLight : "oklch(95% 0.05 155)"),
    color: color || (T ? T.accent : "oklch(35% 0.13 155)"),
    letterSpacing: "0.02em", whiteSpace: "nowrap"
  }}>{label}</span>
);

const ProgressBar = ({ value, color, bg, height = 6 }) => (
  <div style={{ height, borderRadius: 99, background: bg || "oklch(93% 0.03 155)", overflow: "hidden" }}>
    <div style={{ height: "100%", width: `${value}%`, borderRadius: 99, background: color || "oklch(38% 0.13 155)", transition: "width 0.6s ease" }} />
  </div>
);

const PeopleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="13" cy="4" r="3" fill="white" opacity="0.65" />
    <path d="M9.8 18c0-2.6 1.4-4.5 3.2-4.5s3.2 1.9 3.2 4.5H9.8z" fill="white" opacity="0.65" />
    <circle cx="8" cy="6.5" r="2.2" fill="white" />
    <path d="M5.5 18c0-2.1 1.1-3.5 2.5-3.5s2.5 1.4 2.5 3.5H5.5z" fill="white" />
  </svg>
);

const InputField = ({ label, type = "text", placeholder, value, onChange, T }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 6 }}>{label}</label>
    <input type={type} placeholder={placeholder} value={value} onChange={onChange}
      style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${T.border}`, fontFamily: "inherit", fontSize: 14, color: T.text, background: T.bg, outline: "none", transition: "border-color 0.15s" }}
      onFocus={e => e.target.style.borderColor = T.accent}
      onBlur={e => e.target.style.borderColor = T.border} />
  </div>
);

const Modal = ({ open, onClose, title, children, T }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "oklch(0% 0 0 / 0.35)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "white", borderRadius: 20, padding: "28px 30px", width: "100%", maxWidth: 480, boxShadow: "0 20px 60px oklch(0% 0 0 / 0.2)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: T.text, letterSpacing: "-0.02em" }}>{title}</h2>
          <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: "50%", border: "none", background: T.bg, cursor: "pointer", fontSize: 16, color: T.textMuted, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

const ConfirmModal = ({ T, open, title, body, confirmLabel, confirmColor, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div onClick={onCancel} style={{ position: "fixed", inset: 0, background: "oklch(0% 0 0 / 0.4)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "white", borderRadius: 18, padding: "28px 30px", width: "100%", maxWidth: 420, boxShadow: "0 20px 60px oklch(0% 0 0 / 0.2)" }}>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: T.text, marginBottom: 10 }}>{title}</h2>
        <p style={{ fontSize: 14, color: T.textMuted, marginBottom: 24, lineHeight: 1.6 }}>{body}</p>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onCancel} style={{ flex: 1, padding: "11px", borderRadius: 9, border: `1.5px solid ${T.border}`, background: "transparent", color: T.textMuted, fontFamily: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
          <button onClick={onConfirm} style={{ flex: 1, padding: "11px", borderRadius: 9, border: "none", background: confirmColor || T.accentBtn, color: "white", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
};

const Toast = ({ T, msg, type }) => (
  <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", padding: "12px 22px", borderRadius: 10, fontSize: 14, fontWeight: 600, zIndex: 300, boxShadow: "0 4px 24px oklch(0% 0 0 / 0.18)", whiteSpace: "nowrap", background: type === "success" ? T.success : T.danger, color: "white" }}>
    {msg}
  </div>
);

const FileIcon = ({ type }) => {
  const icons = { doc: "📄", sheet: "📊", pdf: "📕" };
  return <div style={{ width: 40, height: 40, borderRadius: 10, background: "oklch(96% 0.03 230)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{icons[type]}</div>;
};

// ── Mentor Me Nav ─────────────────────────────────────────────────────────────
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9"/><rect x="11" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.5"/><rect x="1" y="11" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.5"/><rect x="11" y="11" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9"/></svg> },
  { id: "sessions", label: "Sessions", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="3" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none"/><path d="M5 1v4M13 1v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="M1 8h16" stroke="currentColor" strokeWidth="1.4"/></svg> },
  { id: "goals", label: "Goals", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.6" fill="none"/><circle cx="9" cy="9" r="4" stroke="currentColor" strokeWidth="1.4" fill="none"/><circle cx="9" cy="9" r="1.5" fill="currentColor"/></svg> },
  { id: "messages", label: "Messages", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5l-3 3V3z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round"/></svg> },
  { id: "resources", label: "Resources", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 2h8l4 4v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round"/><path d="M11 2v4h4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M5 10h8M5 13h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg> },
  { id: "profile", label: "Profile", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.6" fill="none"/><path d="M1.5 16c0-3.314 3.358-6 7.5-6s7.5 2.686 7.5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none"/></svg> },
];

// ── Mentor Me Sidebar ─────────────────────────────────────────────────────────
const MentorMeSidebar = ({ active, setActive, T, role, collapsed, setCollapsed, onSignOut }) => {
  const user = role === "mentee" ? menteeData : mentorData;
  return (
    <div style={{ width: collapsed ? 64 : 240, flexShrink: 0, background: T.sidebarBg, borderRight: `1px solid ${T.sidebarBorder || T.border}`, display: "flex", flexDirection: "column", transition: "width 0.25s ease", overflow: "hidden" }}>
      <div style={{ padding: collapsed ? "20px 0" : "24px 20px 20px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", justifyContent: collapsed ? "center" : "flex-start" }} onClick={() => setCollapsed(!collapsed)}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <PeopleIcon />
        </div>
        {!collapsed && <span style={{ fontSize: 16, fontWeight: 800, color: T.sidebarText, letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Mentor Me</span>}
      </div>
      <nav style={{ flex: 1, padding: "4px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
        {navItems.map(item => {
          const isActive = active === item.id;
          return (
            <button key={item.id} onClick={() => setActive(item.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: collapsed ? "10px 0" : "10px 12px", borderRadius: 8, border: "none", cursor: "pointer", width: "100%", justifyContent: collapsed ? "center" : "flex-start", background: isActive ? T.sidebarActive : "transparent", color: isActive ? T.sidebarActiveText : T.sidebarMuted, fontFamily: "inherit", fontSize: 14, fontWeight: isActive ? 600 : 500, transition: "all 0.15s ease" }}>
              {item.icon}
              {!collapsed && item.label}
            </button>
          );
        })}
      </nav>
      <div style={{ padding: collapsed ? "12px 4px" : "12px", borderTop: `1px solid ${T.sidebarBorder || T.border}`, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: collapsed ? "center" : "flex-start", padding: "4px 4px" }}>
          <Avatar initials={user.avatar} size={32} color={avatarColors[user.avatar]} />
          {!collapsed && (
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.sidebarText, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name.split(" ")[0]} {user.name.split(" ")[1]}</div>
              <div style={{ fontSize: 11, color: T.sidebarMuted, fontWeight: 500 }}>{role === "mentee" ? "Mentee" : "Mentor"}</div>
            </div>
          )}
        </div>
        <button onClick={onSignOut} title="Sign out" style={{ display: "flex", alignItems: "center", gap: 10, padding: collapsed ? "8px 0" : "8px 12px", borderRadius: 8, border: "none", cursor: "pointer", width: "100%", justifyContent: collapsed ? "center" : "flex-start", background: "transparent", color: T.sidebarMuted, fontFamily: "inherit", fontSize: 13, fontWeight: 500, transition: "all 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.background = "oklch(0% 0 0 / 0.06)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
            <path d="M6 14H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M10 11l3-3-3-3M13 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {!collapsed && "Sign out"}
        </button>
      </div>
    </div>
  );
};

// ── TopBar ────────────────────────────────────────────────────────────────────
const notifs = [
  { id: 1, text: "Dr. Abena Osei sent you a message", time: "5 min ago", read: false },
  { id: 2, text: "Your session on Tue, May 6 is confirmed", time: "1 hr ago", read: false },
  { id: 3, text: "Ama Boateng shared a new resource", time: "Yesterday", read: true },
  { id: 4, text: "Goal 'Madam Digital Cohort 4' updated", time: "2 days ago", read: true },
];

const TopBar = ({ title, T }) => {
  const [open, setOpen] = useState(false);
  const [read, setRead] = useState(false);
  const unread = read ? 0 : notifs.filter(n => !n.read).length;
  return (
    <div style={{ padding: "16px 36px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: T.surface, flexShrink: 0 }}>
      <span style={{ fontSize: 15, fontWeight: 700, color: T.text }}>{title}</span>
      <div style={{ position: "relative" }}>
        <button onClick={() => { setOpen(!open); setRead(true); }} style={{ width: 38, height: 38, borderRadius: "50%", border: `1px solid ${T.border}`, background: T.bg, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 2a5 5 0 0 1 5 5v3l1.5 2.5H2.5L4 10V7a5 5 0 0 1 5-5z" stroke={T.textMuted} strokeWidth="1.5" fill="none" />
            <path d="M7 14.5a2 2 0 0 0 4 0" stroke={T.textMuted} strokeWidth="1.4" fill="none" />
          </svg>
          {unread > 0 && <div style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: "50%", background: T.accent, border: "1.5px solid white" }} />}
        </button>
        {open && (
          <div style={{ position: "absolute", right: 0, top: 46, width: 300, background: "white", borderRadius: 14, border: `1px solid ${T.border}`, boxShadow: "0 8px 32px oklch(0% 0 0 / 0.12)", zIndex: 50, overflow: "hidden" }}>
            <div style={{ padding: "14px 16px", borderBottom: `1px solid ${T.border}`, fontSize: 13, fontWeight: 700, color: T.text }}>Notifications</div>
            {notifs.map(n => (
              <div key={n.id} style={{ padding: "12px 16px", borderBottom: `1px solid ${T.border}`, background: !n.read && !read ? T.accentLight : "white", display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", marginTop: 5, flexShrink: 0, background: !n.read && !read ? T.accent : T.border }} />
                <div>
                  <div style={{ fontSize: 13, color: T.text, lineHeight: 1.4 }}>{n.text}</div>
                  <div style={{ fontSize: 11, color: T.textMuted, marginTop: 3 }}>{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Dashboard Screen ──────────────────────────────────────────────────────────
const Dashboard = ({ T, role }) => {
  const user = role === "mentee" ? menteeData : mentorData;
  const nextSession = sessions.find(s => s.status === "upcoming");
  const stats = role === "mentee" ? [
    { label: "Active Goals", value: "4", sub: "2 on track" },
    { label: "Sessions Done", value: "18", sub: "This year" },
    { label: "Resources", value: "12", sub: "Shared with you" },
    { label: "Streak", value: "6 wks", sub: "Consistent check-ins" },
  ] : [
    { label: "Active Mentees", value: "3", sub: "All progressing" },
    { label: "Sessions Done", value: "34", sub: "This year" },
    { label: "Avg. Progress", value: "68%", sub: "Across goals" },
    { label: "Resources Shared", value: "22", sub: "This month" },
  ];
  return (
    <div style={{ padding: "32px 36px", maxWidth: 900, display: "flex", flexDirection: "column", gap: 28 }}>
      <div>
        <div style={{ fontSize: 13, color: T.textMuted, fontWeight: 500, marginBottom: 4 }}>Friday, May 1, 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: T.text, letterSpacing: "-0.03em", lineHeight: 1.2 }}>Good morning, {user.name.split(" ")[0]} 👋</h1>
        <p style={{ fontSize: 15, color: T.textMuted, marginTop: 6 }}>{role === "mentee" ? "You have 3 upcoming sessions this week." : "You have 2 mentee check-ins scheduled today."}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ background: T.surface, borderRadius: 12, padding: "18px 20px", border: `1px solid ${T.border}`, boxShadow: T.shadow }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: T.text, letterSpacing: "-0.03em" }}>{stat.value}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginTop: 2 }}>{stat.label}</div>
            <div style={{ fontSize: 12, color: T.textMuted, marginTop: 2 }}>{stat.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background: T.accent, borderRadius: 16, padding: "24px", color: "white", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -20, top: -20, width: 120, height: 120, borderRadius: "50%", background: "oklch(100% 0 0 / 0.06)" }} />
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", opacity: 0.7, textTransform: "uppercase", marginBottom: 12 }}>Next Session</div>
          <div style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.3, marginBottom: 8 }}>{nextSession.title}</div>
          <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4, fontWeight: 500 }}>{role === "mentee" ? `with ${nextSession.mentor}` : "with Joanita Amegashie"}</div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{nextSession.date} · {nextSession.time}</div>
            <div style={{ fontSize: 11, background: "oklch(100% 0 0 / 0.18)", padding: "3px 10px", borderRadius: 99, fontWeight: 600 }}>{nextSession.duration}</div>
          </div>
          <button style={{ marginTop: 16, padding: "10px 20px", borderRadius: 8, border: "none", background: "white", color: T.accent, fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Join Session</button>
        </div>
        <div style={{ background: T.surface, borderRadius: 16, padding: "24px", border: `1px solid ${T.border}`, boxShadow: T.shadow }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.textMuted, marginBottom: 16, letterSpacing: "0.04em", textTransform: "uppercase" }}>Goal Progress</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {goals.slice(0, 3).map(g => (
              <div key={g.id}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.text, flex: 1, paddingRight: 8, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{g.title}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.accentMid, flexShrink: 0 }}>{g.progress}%</div>
                </div>
                <ProgressBar value={g.progress} color={T.accent} bg={T.accentLight} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 14 }}>Recent Messages</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {messages.map(m => (
            <div key={m.id} style={{ background: T.surface, borderRadius: 12, padding: "14px 16px", border: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 14, cursor: "pointer", boxShadow: T.shadow }}>
              <Avatar initials={m.avatar} size={38} color={avatarColors[m.avatar]} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{m.from}</span>
                  <span style={{ fontSize: 11, color: T.textMuted }}>{m.time}</span>
                </div>
                <div style={{ fontSize: 13, color: T.textMuted, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.preview}</div>
              </div>
              {m.unread > 0 && <div style={{ width: 20, height: 20, borderRadius: "50%", background: T.accent, color: "white", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{m.unread}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Sessions Screen ───────────────────────────────────────────────────────────
const Sessions = ({ T, role }) => {
  const [filter, setFilter] = useState("upcoming");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", mentor: "Dr. Abena Osei", date: "", time: "", type: "video", notes: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const filtered = sessions.filter(s => s.status === filter);
  return (
    <div style={{ padding: "32px 36px", maxWidth: 800 }}>
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Book a Session" T={T}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <InputField label="Session title" placeholder="e.g. Brand Voice Workshop" value={form.title} onChange={e => set("title", e.target.value)} T={T} />
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 6 }}>Mentor</label>
            <select value={form.mentor} onChange={e => set("mentor", e.target.value)} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${T.border}`, fontFamily: "inherit", fontSize: 14, color: T.text, background: T.bg, outline: "none" }}>
              {menteeData.mentors.map(m => <option key={m.id}>{m.name}</option>)}
            </select>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <InputField label="Date" type="date" value={form.date} onChange={e => set("date", e.target.value)} T={T} />
            <InputField label="Time" type="time" value={form.time} onChange={e => set("time", e.target.value)} T={T} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 6 }}>Format</label>
            <div style={{ display: "flex", gap: 8 }}>
              {["video", "in-person"].map(t => (
                <button key={t} onClick={() => set("type", t)} style={{ flex: 1, padding: "10px", borderRadius: 8, border: `1.5px solid ${form.type === t ? T.accent : T.border}`, background: form.type === t ? T.accentLight : "transparent", color: form.type === t ? T.accent : T.textMuted, fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                  {t === "video" ? "📹 Video call" : "📍 In person"}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 6 }}>Notes (optional)</label>
            <textarea placeholder="What would you like to discuss?" value={form.notes} onChange={e => set("notes", e.target.value)} rows={3} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${T.border}`, fontFamily: "inherit", fontSize: 14, color: T.text, background: T.bg, outline: "none", resize: "none", lineHeight: 1.6 }} />
          </div>
          <button onClick={() => setShowModal(false)} style={{ width: "100%", padding: "13px", borderRadius: 10, border: "none", background: T.accentBtn, color: "white", fontFamily: "inherit", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Request Session</button>
        </div>
      </Modal>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: T.text, letterSpacing: "-0.03em" }}>Sessions</h1>
          <p style={{ fontSize: 14, color: T.textMuted, marginTop: 4 }}>Your mentorship sessions, all in one place.</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{ padding: "10px 20px", borderRadius: 8, border: "none", background: T.accentBtn, color: "white", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>+ Book Session</button>
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 24, background: T.accentLight, borderRadius: 8, padding: 4, width: "fit-content" }}>
        {["upcoming", "completed"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 18px", borderRadius: 6, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600, transition: "all 0.15s", background: filter === f ? T.accent : "transparent", color: filter === f ? "white" : T.textMuted }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map(s => (
          <div key={s.id} style={{ background: T.surface, borderRadius: 14, padding: "20px 22px", border: `1px solid ${T.border}`, boxShadow: T.shadow, display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: T.accentLight, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.accentMid, textTransform: "uppercase" }}>{s.date.split(" ")[0]}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: T.accent, lineHeight: 1 }}>{s.date.split(" ")[1].replace(",", "")}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.text }}>{s.title}</div>
              <div style={{ fontSize: 13, color: T.textMuted, marginTop: 3 }}>{role === "mentee" ? `with ${s.mentor}` : "with Joanita Amegashie"} · {s.time} · {s.duration}</div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Badge label={s.type === "video" ? "📹 Video" : "📍 In-person"} bg={T.accentLight} color={T.accent} />
              {s.status === "upcoming" && <button style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: T.accentBtn, color: "white", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Join</button>}
              {s.status === "completed" && <button style={{ padding: "8px 16px", borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", color: T.textMuted, fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Notes</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Goals Screen ──────────────────────────────────────────────────────────────
const Goals = ({ T }) => {
  const [expanded, setExpanded] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [gform, setGform] = useState({ title: "", category: "Business", dueDate: "", mentor: "Dr. Abena Osei", desc: "" });
  const setG = (k, v) => setGform(f => ({ ...f, [k]: v }));
  const catColors = {
    "Business": { bg: "oklch(96% 0.05 230)", text: "oklch(35% 0.12 230)" },
    "Community": { bg: "oklch(96% 0.05 155)", text: "oklch(30% 0.12 155)" },
    "Thought Leadership": { bg: "oklch(97% 0.05 80)", text: "oklch(40% 0.12 80)" },
  };
  return (
    <div style={{ padding: "32px 36px", maxWidth: 800 }}>
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add a Goal" T={T}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <InputField label="Goal title" placeholder="e.g. Launch Madam Digital Cohort 5" value={gform.title} onChange={e => setG("title", e.target.value)} T={T} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 6 }}>Category</label>
              <select value={gform.category} onChange={e => setG("category", e.target.value)} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${T.border}`, fontFamily: "inherit", fontSize: 14, color: T.text, background: T.bg, outline: "none" }}>
                {["Business", "Community", "Thought Leadership", "Personal Growth"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <InputField label="Due date" type="date" value={gform.dueDate} onChange={e => setG("dueDate", e.target.value)} T={T} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 6 }}>Mentor</label>
            <select value={gform.mentor} onChange={e => setG("mentor", e.target.value)} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${T.border}`, fontFamily: "inherit", fontSize: 14, color: T.text, background: T.bg, outline: "none" }}>
              {menteeData.mentors.map(m => <option key={m.id}>{m.name}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 6 }}>Description</label>
            <textarea placeholder="What does success look like for this goal?" value={gform.desc} onChange={e => setG("desc", e.target.value)} rows={3} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${T.border}`, fontFamily: "inherit", fontSize: 14, color: T.text, background: T.bg, outline: "none", resize: "none", lineHeight: 1.6 }} />
          </div>
          <button onClick={() => setShowModal(false)} style={{ width: "100%", padding: "13px", borderRadius: 10, border: "none", background: T.accentBtn, color: "white", fontFamily: "inherit", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Save Goal</button>
        </div>
      </Modal>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: T.text, letterSpacing: "-0.03em" }}>Goals</h1>
          <p style={{ fontSize: 14, color: T.textMuted, marginTop: 4 }}>Track your progress toward what matters most.</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{ padding: "10px 20px", borderRadius: 8, border: "none", background: T.accentBtn, color: "white", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>+ Add Goal</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {goals.map(g => {
          const cat = catColors[g.category] || catColors["Business"];
          const isExp = expanded === g.id;
          return (
            <div key={g.id} style={{ background: T.surface, borderRadius: 14, border: `1px solid ${T.border}`, boxShadow: T.shadow, overflow: "hidden" }}>
              <div style={{ padding: "20px 22px", cursor: "pointer" }} onClick={() => setExpanded(isExp ? null : g.id)}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: T.text }}>{g.title}</span>
                      <Badge label={g.category} bg={cat.bg} color={cat.text} />
                    </div>
                    <div style={{ display: "flex", gap: 16, fontSize: 12, color: T.textMuted, marginBottom: 12, fontWeight: 500 }}>
                      <span>Due {g.dueDate}</span>
                      <span>Mentor: {g.mentor.split(" ")[1]}</span>
                      <span>{g.completed}/{g.milestones.length} milestones</span>
                    </div>
                    <ProgressBar value={g.progress} color={T.accent} bg={T.accentLight} height={8} />
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: T.accent, letterSpacing: "-0.04em", flexShrink: 0, marginTop: 2 }}>{g.progress}%</div>
                </div>
              </div>
              {isExp && (
                <div style={{ padding: "18px 22px 20px", borderTop: `1px solid ${T.border}` }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Milestones</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {g.milestones.map((m, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <div style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0, background: i < g.completed ? T.accent : T.accentLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {i < g.completed && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" /></svg>}
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 500, color: i < g.completed ? T.text : T.textMuted }}>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Messages Screen ───────────────────────────────────────────────────────────
const MessagesScreen = ({ T }) => {
  const [activeChat, setActiveChat] = useState(messages[0]);
  const [input, setInput] = useState("");
  const [chats, setChats] = useState({ [messages[0].id]: chatMessages });

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), sender: "me", avatar: "JA", text: input, time: "Now", mine: true };
    setChats(prev => ({ ...prev, [activeChat.id]: [...(prev[activeChat.id] || []), newMsg] }));
    setInput("");
  };

  const currentChat = chats[activeChat.id] || [];

  return (
    <div style={{ display: "flex", flex: 1, height: "100%", overflow: "hidden" }}>
      <div style={{ width: 280, borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "24px 20px 16px" }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: T.text, letterSpacing: "-0.02em" }}>Messages</div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "0 8px" }}>
          {messages.map(m => (
            <div key={m.id} onClick={() => setActiveChat(m)} style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px", borderRadius: 10, cursor: "pointer", marginBottom: 2, background: activeChat.id === m.id ? T.accentLight : "transparent", transition: "background 0.15s" }}>
              <div style={{ position: "relative" }}>
                <Avatar initials={m.avatar} size={40} color={avatarColors[m.avatar]} />
                <div style={{ position: "absolute", bottom: 0, right: 0, width: 10, height: 10, borderRadius: "50%", background: "oklch(65% 0.18 142)", border: "2px solid white" }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{m.from}</span>
                  <span style={{ fontSize: 11, color: T.textMuted }}>{m.time}</span>
                </div>
                <div style={{ fontSize: 12, color: T.textMuted, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.preview}</div>
              </div>
              {m.unread > 0 && <div style={{ width: 18, height: 18, borderRadius: "50%", background: T.accent, color: "white", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{m.unread}</div>}
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "16px 24px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar initials={activeChat.avatar} size={36} color={avatarColors[activeChat.avatar]} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{activeChat.from}</div>
            <div style={{ fontSize: 12, color: "oklch(60% 0.14 142)", fontWeight: 500 }}>● Online</div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: 16 }}>
          {currentChat.map(msg => (
            <div key={msg.id} style={{ display: "flex", gap: 10, flexDirection: msg.mine ? "row-reverse" : "row", alignItems: "flex-end" }}>
              {!msg.mine && <Avatar initials={msg.avatar} size={30} color={avatarColors[msg.avatar]} />}
              <div style={{ maxWidth: "68%", padding: "12px 14px", borderRadius: msg.mine ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: msg.mine ? T.accent : T.surface, color: msg.mine ? "white" : T.text, fontSize: 14, lineHeight: 1.5, border: msg.mine ? "none" : `1px solid ${T.border}`, boxShadow: T.shadow }}>
                {msg.text}
                <div style={{ fontSize: 11, marginTop: 4, opacity: 0.6, textAlign: msg.mine ? "right" : "left" }}>{msg.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: "16px 24px", borderTop: `1px solid ${T.border}`, display: "flex", gap: 10 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} placeholder="Write a message…" style={{ flex: 1, padding: "12px 16px", borderRadius: 10, border: `1px solid ${T.border}`, fontFamily: "inherit", fontSize: 14, background: T.bg, outline: "none", color: T.text }} />
          <button onClick={sendMessage} style={{ padding: "12px 20px", borderRadius: 10, border: "none", background: T.accentBtn, color: "white", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Send</button>
        </div>
      </div>
    </div>
  );
};

// ── Resources Screen ──────────────────────────────────────────────────────────
const Resources = ({ T }) => {
  const [search, setSearch] = useState("");
  const filtered = resources.filter(r => r.title.toLowerCase().includes(search.toLowerCase()) || r.tags.some(t => t.toLowerCase().includes(search.toLowerCase())));
  return (
    <div style={{ padding: "32px 36px", maxWidth: 800 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: T.text, letterSpacing: "-0.03em" }}>Resources</h1>
          <p style={{ fontSize: 14, color: T.textMuted, marginTop: 4 }}>Notes, docs, and files shared in your mentorship.</p>
        </div>
        <button style={{ padding: "10px 20px", borderRadius: 8, border: "none", background: T.accentBtn, color: "white", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>+ Upload</button>
      </div>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search resources…" style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: `1px solid ${T.border}`, fontFamily: "inherit", fontSize: 14, background: T.surface, outline: "none", color: T.text, marginBottom: 20 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map(r => (
          <div key={r.id} style={{ background: T.surface, borderRadius: 12, padding: "16px 18px", border: `1px solid ${T.border}`, boxShadow: T.shadow, display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
            <FileIcon type={r.type} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 4 }}>{r.title}</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, color: T.textMuted }}>{r.mentor} · {r.date} · {r.size}</span>
                {r.tags.map(tag => <Badge key={tag} label={tag} bg={T.accentLight} color={T.accent} />)}
              </div>
            </div>
            <button style={{ padding: "8px 14px", borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", color: T.textMuted, fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Download</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Profile Screen ────────────────────────────────────────────────────────────
const bannerPresets = [
  "linear-gradient(135deg, oklch(36% 0.13 155), oklch(50% 0.12 190))",
  "linear-gradient(135deg, oklch(36% 0.13 82), oklch(50% 0.12 50))",
  "linear-gradient(135deg, oklch(28% 0.10 270), oklch(45% 0.12 210))",
  "linear-gradient(135deg, oklch(25% 0.06 155), oklch(35% 0.10 155))",
  "linear-gradient(135deg, oklch(55% 0.14 20), oklch(45% 0.12 50))",
];

const Profile = ({ T, role }) => {
  const user = role === "mentee" ? menteeData : mentorData;
  const connections = role === "mentee" ? menteeData.mentors : mentorData.mentees;
  const [bannerIdx, setBannerIdx] = useState(0);
  const [bannerImg, setBannerImg] = useState(null);
  const [showBannerPicker, setShowBannerPicker] = useState(false);
  const bannerInputRef = useRef();
  const avatarInputRef = useRef();

  const handleBannerFile = e => {
    const file = e.target.files[0];
    if (!file) return;
    setBannerImg(URL.createObjectURL(file));
    setShowBannerPicker(false);
  };

  const bannerStyle = bannerImg ? { backgroundImage: `url(${bannerImg})`, backgroundSize: "cover", backgroundPosition: "center" } : { background: bannerPresets[bannerIdx] };

  return (
    <div style={{ padding: "32px 36px", maxWidth: 800 }}>
      <div style={{ background: T.surface, borderRadius: 20, border: `1px solid ${T.border}`, boxShadow: T.shadowMd, overflow: "hidden", marginBottom: 24 }}>
        <div style={{ height: 140, position: "relative", ...bannerStyle }}>
          <button onClick={() => setShowBannerPicker(!showBannerPicker)} style={{ position: "absolute", top: 12, right: 12, padding: "7px 14px", borderRadius: 8, background: "oklch(0% 0 0 / 0.35)", backdropFilter: "blur(6px)", border: "1px solid oklch(100% 0 0 / 0.2)", color: "white", fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", gap: 6, alignItems: "center" }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 10l3-3 2.5 2.5L9 6l3 4H1z" fill="white" opacity="0.9" /><circle cx="9.5" cy="3.5" r="1.5" fill="white" opacity="0.9" /></svg>
            Edit Banner
          </button>
          {showBannerPicker && (
            <div style={{ position: "absolute", top: 46, right: 12, background: "white", borderRadius: 12, padding: 14, boxShadow: T.shadowMd, border: `1px solid ${T.border}`, zIndex: 10, width: 220 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.textMuted, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Choose a gradient</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                {bannerPresets.map((bg, i) => (
                  <button key={i} onClick={() => { setBannerIdx(i); setBannerImg(null); setShowBannerPicker(false); }} style={{ width: 36, height: 36, borderRadius: 8, border: bannerIdx === i && !bannerImg ? `2.5px solid ${T.accent}` : "2px solid transparent", background: bg, cursor: "pointer", flexShrink: 0 }} />
                ))}
              </div>
              <button onClick={() => bannerInputRef.current.click()} style={{ width: "100%", padding: "8px", borderRadius: 8, border: `1px dashed ${T.border}`, background: T.accentLight, color: T.accent, fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Upload photo</button>
              <input ref={bannerInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleBannerFile} />
            </div>
          )}
        </div>
        <div style={{ padding: "0 28px 28px" }}>
          <div style={{ display: "flex", gap: 18, alignItems: "flex-end", marginTop: -44, marginBottom: 20 }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <Avatar initials={user.avatar} size={88} color={avatarColors[user.avatar]} extStyle={{ border: "4px solid white", boxShadow: "0 2px 10px oklch(0% 0 0 / 0.18)" }} />
              <button onClick={() => avatarInputRef.current.click()} style={{ position: "absolute", bottom: 4, right: 4, width: 26, height: 26, borderRadius: "50%", background: T.accent, border: "2px solid white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8.5 1.5a1.414 1.414 0 0 1 2 2L4 10H2v-2l6.5-6.5z" stroke="white" strokeWidth="1.3" fill="none" strokeLinejoin="round" /></svg>
              </button>
              <input ref={avatarInputRef} type="file" accept="image/*" style={{ display: "none" }} />
            </div>
            <div style={{ paddingBottom: 8 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: T.text, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{user.name}</div>
              <div style={{ fontSize: 14, color: T.textMuted, fontWeight: 500, marginTop: 3 }}>{user.title}</div>
            </div>
          </div>
          <p style={{ fontSize: 14, color: T.textMuted, lineHeight: 1.7, maxWidth: 580 }}>
            {role === "mentee" ? "Digital marketing strategist, trainer, and founder. Co-founder of Ravvis Media and creator of the Madam Digital brand — on a mission to simplify digital marketing for entrepreneurs and young professionals across Africa." : "Brand Strategy Mentor · Co-founder of Ravvis Media · Creator of Madam Digital. Passionate about helping entrepreneurs and young professionals across Africa build strong digital foundations."}
          </p>
        </div>
      </div>
      <div style={{ background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`, boxShadow: T.shadow, padding: "22px 24px" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 18 }}>{role === "mentee" ? "My Mentors" : "My Mentees"}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {connections.map(c => (
            <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ position: "relative" }}>
                <Avatar initials={c.avatar} size={44} color={avatarColors[c.avatar]} />
                {c.online && <div style={{ position: "absolute", bottom: 0, right: 0, width: 11, height: 11, borderRadius: "50%", background: "oklch(65% 0.18 142)", border: "2px solid white" }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{c.name}</div>
                <div style={{ fontSize: 12, color: T.textMuted, marginTop: 1 }}>{c.role}</div>
              </div>
              {role === "mentor" && (
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <div style={{ width: 80 }}><ProgressBar value={c.progress} color={T.accent} bg={T.accentLight} height={5} /></div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: T.accentMid, width: 32 }}>{c.progress}%</span>
                </div>
              )}
              <button style={{ padding: "7px 14px", borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", color: T.textMuted, fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Message</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Org App ───────────────────────────────────────────────────────────────────
const orgNavItems = [
  { id: "overview", label: "Overview", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9"/><rect x="11" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.5"/><rect x="1" y="11" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.5"/><rect x="11" y="11" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9"/></svg> },
  { id: "members", label: "Members", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="6.5" cy="6" r="3" stroke="currentColor" strokeWidth="1.6" fill="none"/><path d="M1 16c0-2.761 2.462-5 5.5-5s5.5 2.239 5.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none"/><circle cx="13" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.4" fill="none"/><path d="M16 14c0-2.209-1.343-4-3-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/></svg> },
  { id: "pairings", label: "Pairings", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 9h8M9 5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { id: "settings", label: "Settings", icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.22 3.22l1.41 1.41M13.37 13.37l1.41 1.41M3.22 14.78l1.41-1.41M13.37 4.63l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
];

const OrgSidebar = ({ active, setActive, T, orgName, onSignOut }) => (
  <div style={{ width: 240, flexShrink: 0, background: T.sidebarBg, borderRight: `1px solid ${T.sidebarBorder || T.border}`, display: "flex", flexDirection: "column" }}>
    <div style={{ padding: "24px 20px 20px", display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><PeopleIcon /></div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: T.sidebarText, letterSpacing: "-0.02em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{orgName}</div>
        <div style={{ fontSize: 11, color: T.sidebarMuted, fontWeight: 500 }}>Organisation</div>
      </div>
    </div>
    <nav style={{ flex: 1, padding: "4px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
      {orgNavItems.map(item => {
        const isActive = active === item.id;
        return (
          <button key={item.id} onClick={() => setActive(item.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 8, border: "none", cursor: "pointer", width: "100%", background: isActive ? T.sidebarActive : "transparent", color: isActive ? T.sidebarActiveText : T.sidebarMuted, fontFamily: "inherit", fontSize: 14, fontWeight: isActive ? 600 : 500, transition: "all 0.15s ease" }}>
            {item.icon}{item.label}
          </button>
        );
      })}
    </nav>
    <div style={{ padding: "16px 12px", borderTop: `1px solid ${T.sidebarBorder || T.border}` }}>
      <button onClick={onSignOut} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", color: T.sidebarMuted, fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer", textAlign: "left" }}>Sign out</button>
    </div>
  </div>
);

const OrgOverview = ({ T, orgName, orgCode }) => (
  <div style={{ padding: "32px 36px", maxWidth: 900 }}>
    <div style={{ marginBottom: 28 }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: T.text, letterSpacing: "-0.03em" }}>{orgName}</h1>
      <p style={{ fontSize: 14, color: T.textMuted, marginTop: 4 }}>Organisation dashboard · April 2026</p>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
      {[{ label: "Total Mentors", value: "3", sub: "Active" }, { label: "Total Mentees", value: "5", sub: "Enrolled" }, { label: "Active Pairings", value: "4", sub: "1 unassigned" }, { label: "Sessions This Month", value: "23", sub: "↑ 18% vs last" }].map((s, i) => (
        <div key={i} style={{ background: T.surface, borderRadius: 12, padding: "18px 20px", border: `1px solid ${T.border}`, boxShadow: T.shadow }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: T.text, letterSpacing: "-0.03em" }}>{s.value}</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginTop: 2 }}>{s.label}</div>
          <div style={{ fontSize: 12, color: T.textMuted, marginTop: 2 }}>{s.sub}</div>
        </div>
      ))}
    </div>
    <div style={{ background: T.accent, borderRadius: 16, padding: "28px 32px", color: "white", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: -30, top: -30, width: 160, height: 160, borderRadius: "50%", background: "oklch(100% 0 0 / 0.06)" }} />
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", opacity: 0.7, textTransform: "uppercase", marginBottom: 8 }}>Your Organisation Code</div>
        <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: "0.15em", fontFamily: "monospace" }}>{orgCode}</div>
        <div style={{ fontSize: 13, opacity: 0.75, marginTop: 8 }}>Share this with mentors and mentees so they can join your organisation.</div>
      </div>
      <button style={{ padding: "12px 22px", borderRadius: 10, border: "2px solid oklch(100% 0 0 / 0.35)", background: "transparent", color: "white", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer", flexShrink: 0 }}>Copy Code</button>
    </div>
    <div style={{ background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`, boxShadow: T.shadow, padding: "22px 24px" }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 16 }}>Recent Activity</div>
      {[
        { text: "Joanita Amegashie completed a session with Dr. Abena Osei", time: "2h ago" },
        { text: "Yaw Boadu joined the organisation", time: "Yesterday" },
        { text: "Efua Asante reached 88% on her content strategy goal", time: "2 days ago" },
        { text: "Kwame Mensah added 2 new resources", time: "3 days ago" },
      ].map((a, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "12px 0", borderBottom: i < 3 ? `1px solid ${T.border}` : "none" }}>
          <span style={{ fontSize: 14, color: T.text, lineHeight: 1.5 }}>{a.text}</span>
          <span style={{ fontSize: 12, color: T.textMuted, flexShrink: 0, marginLeft: 16 }}>{a.time}</span>
        </div>
      ))}
    </div>
  </div>
);

const OrgMembers = ({ T }) => {
  const [tab, setTab] = useState("mentors");
  const list = tab === "mentors" ? orgMembers.mentors : orgMembers.mentees;
  return (
    <div style={{ padding: "32px 36px", maxWidth: 800 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: T.text, letterSpacing: "-0.03em" }}>Members</h1>
          <p style={{ fontSize: 14, color: T.textMuted, marginTop: 4 }}>Manage your organisation's mentors and mentees.</p>
        </div>
        <button style={{ padding: "10px 20px", borderRadius: 8, border: "none", background: T.accentBtn, color: "white", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>+ Invite Member</button>
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 24, background: T.accentLight, borderRadius: 8, padding: 4, width: "fit-content" }}>
        {["mentors", "mentees"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 20px", borderRadius: 6, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600, transition: "all 0.15s", background: tab === t ? T.accent : "transparent", color: tab === t ? "white" : T.textMuted }}>
            {t.charAt(0).toUpperCase() + t.slice(1)} ({t === "mentors" ? orgMembers.mentors.length : orgMembers.mentees.length})
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {list.map(m => (
          <div key={m.id} style={{ background: T.surface, borderRadius: 12, padding: "16px 18px", border: `1px solid ${T.border}`, boxShadow: T.shadow, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ position: "relative" }}>
              <Avatar initials={m.avatar} size={44} color={avatarColors[m.avatar]} />
              {m.online && <div style={{ position: "absolute", bottom: 0, right: 0, width: 11, height: 11, borderRadius: "50%", background: "oklch(65% 0.18 142)", border: "2px solid white" }} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{m.name}</div>
              <div style={{ fontSize: 12, color: T.textMuted, marginTop: 2 }}>
                {tab === "mentors" ? `${m.role} · ${m.mentees} mentees · ${m.sessions} sessions` : `${m.role} · Mentor: ${m.mentor}`}
              </div>
            </div>
            {tab === "mentees" && m.mentor !== "Unassigned" && (
              <div style={{ width: 80 }}>
                <ProgressBar value={m.progress} color={T.accent} bg={T.accentLight} height={5} />
                <div style={{ fontSize: 11, color: T.textMuted, marginTop: 3, textAlign: "right" }}>{m.progress}%</div>
              </div>
            )}
            {tab === "mentees" && m.mentor === "Unassigned" && <Badge label="Unassigned" bg="oklch(97% 0.04 20)" color="oklch(50% 0.14 20)" />}
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ padding: "7px 14px", borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", color: T.textMuted, fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>View</button>
              <button style={{ padding: "7px 14px", borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", color: "oklch(50% 0.14 20)", fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const OrgPairings = ({ T }) => {
  const pairs = orgMembers.mentees.filter(m => m.mentor !== "Unassigned");
  const unassigned = orgMembers.mentees.filter(m => m.mentor === "Unassigned");
  return (
    <div style={{ padding: "32px 36px", maxWidth: 800 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: T.text, letterSpacing: "-0.03em" }}>Pairings</h1>
          <p style={{ fontSize: 14, color: T.textMuted, marginTop: 4 }}>Manage who is mentoring whom.</p>
        </div>
        <button style={{ padding: "10px 20px", borderRadius: 8, border: "none", background: T.accentBtn, color: "white", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>+ Create Pairing</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
        {pairs.map(mentee => {
          const mentor = orgMembers.mentors.find(m => m.name === mentee.mentor);
          return (
            <div key={mentee.id} style={{ background: T.surface, borderRadius: 14, border: `1px solid ${T.border}`, boxShadow: T.shadow, padding: "18px 22px", display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                <Avatar initials={mentor?.avatar || "?"} size={40} color={avatarColors[mentor?.avatar]} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{mentee.mentor}</div>
                  <div style={{ fontSize: 11, color: T.textMuted }}>Mentor</div>
                </div>
              </div>
              <div style={{ padding: "0 20px", color: T.textLight }}>
                <svg width="24" height="16" viewBox="0 0 24 16" fill="none"><path d="M0 8h20M14 2l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                <Avatar initials={mentee.avatar} size={40} color={avatarColors[mentee.avatar]} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{mentee.name}</div>
                  <div style={{ fontSize: 11, color: T.textMuted }}>Mentee · {mentee.progress}% progress</div>
                </div>
              </div>
              <div style={{ width: 100, marginLeft: 16 }}><ProgressBar value={mentee.progress} color={T.accent} bg={T.accentLight} height={5} /></div>
              <button style={{ marginLeft: 16, padding: "7px 14px", borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", color: T.textMuted, fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Edit</button>
            </div>
          );
        })}
      </div>
      {unassigned.length > 0 && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "oklch(50% 0.14 20)", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "oklch(70% 0.14 20)" }} />
            Unassigned Mentees
          </div>
          {unassigned.map(m => (
            <div key={m.id} style={{ background: T.surface, borderRadius: 12, padding: "16px 20px", border: "1.5px dashed oklch(86% 0.06 20)", display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar initials={m.avatar} size={38} color={avatarColors[m.avatar]} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{m.name}</div>
                <div style={{ fontSize: 12, color: T.textMuted }}>{m.role} · Awaiting mentor assignment</div>
              </div>
              <button style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: T.accentBtn, color: "white", fontFamily: "inherit", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Assign Mentor</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const OrgSettings = ({ T, orgName, orgCode }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div style={{ padding: "32px 36px", maxWidth: 680 }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: T.text, letterSpacing: "-0.03em", marginBottom: 28 }}>Settings</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`, boxShadow: T.shadow, padding: "24px" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 4 }}>Organisation Code</div>
          <div style={{ fontSize: 13, color: T.textMuted, marginBottom: 16 }}>Members use this code when signing up to join your organisation.</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ flex: 1, padding: "12px 16px", borderRadius: 10, border: `1px solid ${T.border}`, background: T.bg, fontFamily: "monospace", fontSize: 20, fontWeight: 700, letterSpacing: "0.12em", color: T.accent }}>{orgCode}</div>
            <button onClick={copy} style={{ padding: "12px 20px", borderRadius: 10, border: "none", background: copied ? "oklch(45% 0.15 142)" : T.accentBtn, color: "white", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "background 0.2s" }}>{copied ? "Copied!" : "Copy"}</button>
          </div>
        </div>
        <div style={{ background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`, boxShadow: T.shadow, padding: "24px" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 16 }}>Organisation Profile</div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: T.text, display: "block", marginBottom: 6 }}>Organisation Name</label>
            <input defaultValue={orgName} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${T.border}`, fontFamily: "inherit", fontSize: 14, color: T.text, background: T.bg, outline: "none" }} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: T.text, display: "block", marginBottom: 6 }}>Industry / Type</label>
            <input defaultValue="Education & Training" style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${T.border}`, fontFamily: "inherit", fontSize: 14, color: T.text, background: T.bg, outline: "none" }} />
          </div>
          <button style={{ padding: "10px 22px", borderRadius: 9, border: "none", background: T.accentBtn, color: "white", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

const OrgApp = ({ T, orgName, orgCode, onSignOut }) => {
  const [active, setActive] = useState("overview");
  const screens = {
    overview: <OrgOverview T={T} orgName={orgName} orgCode={orgCode} />,
    members: <OrgMembers T={T} />,
    pairings: <OrgPairings T={T} />,
    settings: <OrgSettings T={T} orgName={orgName} orgCode={orgCode} />,
  };
  return (
    <div style={{ display: "flex", height: "100vh", background: T.bg, overflow: "hidden" }}>
      <OrgSidebar active={active} setActive={setActive} T={T} orgName={orgName} onSignOut={onSignOut} />
      <div style={{ flex: 1, overflowY: "auto" }}>{screens[active]}</div>
    </div>
  );
};

// ── Admin Portal ──────────────────────────────────────────────────────────────
const adminNavItems = [
  { id: "overview", label: "Overview", badge: false, icon: <svg width="17" height="17" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.9"/><rect x="10" y="1" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.4"/><rect x="1" y="10" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.4"/><rect x="10" y="10" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.9"/></svg> },
  { id: "pending", label: "Pending Approvals", badge: true, icon: <svg width="17" height="17" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.6" fill="none"/><path d="M9 5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg> },
  { id: "approved", label: "Organisations", badge: false, icon: <svg width="17" height="17" viewBox="0 0 18 18" fill="none"><path d="M3 16V8l6-5 6 5v8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/><rect x="7" y="11" width="4" height="5" rx="1" fill="currentColor" opacity="0.7"/></svg> },
  { id: "users", label: "All Users", badge: false, icon: <svg width="17" height="17" viewBox="0 0 18 18" fill="none"><circle cx="6.5" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M1 16c0-2.76 2.46-5 5.5-5s5.5 2.24 5.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/><circle cx="13" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3" fill="none"/><path d="M16 14c0-2.2-1.34-4-3-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none"/></svg> },
  { id: "stats", label: "Analytics", badge: false, icon: <svg width="17" height="17" viewBox="0 0 18 18" fill="none"><path d="M2 14l4-5 3 3 4-6 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg> },
];

const AdminSidebar = ({ T, active, setActive, pendingCount, onSignOut }) => (
  <div style={{ width: 248, flexShrink: 0, background: T.sidebarBg, display: "flex", flexDirection: "column", borderRight: `1px solid ${T.sidebarBorder}` }}>
    <div style={{ padding: "24px 20px 20px", display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 34, height: 34, borderRadius: 9, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><PeopleIcon /></div>
      <div>
        <div style={{ fontSize: 15, fontWeight: 800, color: T.sidebarText, letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Mentor Me</div>
        <div style={{ fontSize: 10, fontWeight: 700, color: T.sidebarMuted, letterSpacing: "0.1em" }}>ADMIN</div>
      </div>
    </div>
    <div style={{ padding: "4px 8px", flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
      {adminNavItems.map(item => {
        const isActive = active === item.id;
        return (
          <button key={item.id} onClick={() => setActive(item.id)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "10px 12px", borderRadius: 8, border: "none", cursor: "pointer", width: "100%", background: isActive ? T.sidebarActive : "transparent", color: isActive ? T.sidebarActiveText : T.sidebarMuted, fontFamily: "inherit", fontSize: 13.5, fontWeight: isActive ? 600 : 500, transition: "all 0.15s" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>{item.icon}{item.label}</span>
            {item.badge && pendingCount > 0 && <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 7px", borderRadius: 99, background: "oklch(55% 0.17 20)", color: "white" }}>{pendingCount}</span>}
          </button>
        );
      })}
    </div>
    <div style={{ padding: "14px 10px", borderTop: `1px solid ${T.sidebarBorder}` }}>
      <div style={{ padding: "8px 10px", marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white", flexShrink: 0 }}>A</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.sidebarText, whiteSpace: "nowrap" }}>Super Admin</div>
          <div style={{ fontSize: 11, color: T.sidebarMuted }}>admin@mentorme.app</div>
        </div>
      </div>
      <button onClick={onSignOut} style={{ width: "100%", padding: "8px 10px", borderRadius: 7, border: "1px solid oklch(30% 0.06 240)", background: "transparent", color: T.sidebarMuted, fontFamily: "inherit", fontSize: 12.5, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.15s" }}
        onMouseEnter={e => e.currentTarget.style.color = "white"}
        onMouseLeave={e => e.currentTarget.style.color = T.sidebarMuted}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 14H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M10 11l3-3-3-3M13 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Sign out
      </button>
    </div>
  </div>
);

const AdminStat = ({ value, label, sub, accent, T }) => (
  <div style={{ background: T.surface, borderRadius: 12, padding: "20px 22px", border: `1px solid ${T.border}`, boxShadow: T.shadow }}>
    <div style={{ fontSize: 30, fontWeight: 800, color: accent ? T.accent : T.text, letterSpacing: "-0.04em", lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginTop: 6 }}>{label}</div>
    {sub && <div style={{ fontSize: 12, color: T.textMuted, marginTop: 3 }}>{sub}</div>}
  </div>
);

const AdminOverview = ({ T, pending, approved }) => (
  <div style={{ padding: "32px 36px", maxWidth: 920 }}>
    <div style={{ marginBottom: 28 }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: T.text, letterSpacing: "-0.03em" }}>Overview</h1>
      <p style={{ fontSize: 14, color: T.textMuted, marginTop: 4 }}>Platform health at a glance · May 2026</p>
    </div>
    {pending.length > 0 && (
      <div style={{ background: "oklch(97% 0.05 65)", border: "1.5px solid oklch(88% 0.08 65)", borderRadius: 14, padding: "16px 20px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "oklch(65% 0.14 65)", flexShrink: 0 }} />
          <span style={{ fontSize: 14, fontWeight: 600, color: "oklch(40% 0.10 65)" }}>{pending.length} organisation{pending.length > 1 ? "s" : ""} awaiting your approval</span>
        </div>
        <Badge label="Review now →" bg="oklch(88% 0.08 65)" color="oklch(38% 0.10 65)" />
      </div>
    )}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
      <AdminStat T={T} value={String(approved.filter(o => o.status === "active").length)} label="Active Orgs" sub={pending.length + " pending"} />
      <AdminStat T={T} value="142" label="Total Users" sub="Mentors + mentees" accent />
      <AdminStat T={T} value="234" label="Sessions / month" sub="↑ 22% vs last month" />
      <AdminStat T={T} value="4" label="Countries" sub="Ghana · Nigeria · Kenya · SA" />
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <div style={{ background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`, boxShadow: T.shadow, padding: "22px 24px" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 16 }}>Recent applications</div>
        {pending.slice(0, 3).map(org => (
          <div key={org.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{org.name}</div>
              <div style={{ fontSize: 12, color: T.textMuted }}>{org.country} · {org.applied}</div>
            </div>
            <Badge label="Pending" bg="oklch(97% 0.05 65)" color="oklch(45% 0.10 65)" />
          </div>
        ))}
        {pending.length === 0 && <div style={{ fontSize: 14, color: T.textMuted, textAlign: "center", padding: "20px 0" }}>No pending applications</div>}
      </div>
      <div style={{ background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`, boxShadow: T.shadow, padding: "22px 24px" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 16 }}>Sessions trend</div>
        <div style={{ display: "flex", gap: 5, alignItems: "flex-end", height: 90 }}>
          {[40,55,48,70,65,80,95,88,100,92,110,120].map((h, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <div style={{ width: "100%", height: h * 0.65, borderRadius: "3px 3px 2px 2px", background: i >= 10 ? T.accent : T.accentLight }} />
              <div style={{ fontSize: 8, color: T.textLight }}>{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const AdminPending = ({ T, orgs, onApprove, onReject }) => {
  const [confirm, setConfirm] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const handleAction = () => {
    if (confirm.action === "approve") onApprove(confirm.org.id);
    else onReject(confirm.org.id);
    setConfirm(null);
  };
  return (
    <div style={{ padding: "32px 36px", maxWidth: 860 }}>
      <ConfirmModal T={T} open={!!confirm} title={confirm?.action === "approve" ? `Approve ${confirm?.org.name}?` : `Reject ${confirm?.org.name}?`} body={confirm?.action === "approve" ? `This will create an active account for ${confirm?.org.name} and generate their org code.` : `${confirm?.org.name} will be notified that their application was not approved.`} confirmLabel={confirm?.action === "approve" ? "Approve" : "Reject"} confirmColor={confirm?.action === "approve" ? T.success : T.danger} onConfirm={handleAction} onCancel={() => setConfirm(null)} />
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: T.text, letterSpacing: "-0.03em" }}>Pending Approvals</h1>
        <p style={{ fontSize: 14, color: T.textMuted, marginTop: 4 }}>{orgs.length > 0 ? `${orgs.length} application${orgs.length > 1 ? "s" : ""} waiting for review.` : "No pending applications."}</p>
      </div>
      {orgs.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: T.text }}>All caught up!</div>
          <div style={{ fontSize: 14, color: T.textMuted, marginTop: 6 }}>No organisations waiting for approval.</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {orgs.map(org => (
            <div key={org.id} style={{ background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`, boxShadow: T.shadow, overflow: "hidden" }}>
              <div style={{ padding: "20px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 16, fontWeight: 800, color: T.text }}>{org.name}</span>
                      <Badge T={T} label={org.industry} />
                      <Badge label={org.country} bg="oklch(96% 0.03 155)" color="oklch(36% 0.08 155)" />
                    </div>
                    <div style={{ fontSize: 13, color: T.textMuted, marginBottom: 10 }}>{org.email} · <span style={{ color: T.accentMid }}>{org.website}</span></div>
                    <div style={{ display: "flex", gap: 18, fontSize: 13, color: T.textMuted, fontWeight: 500 }}>
                      <span>👩‍🏫 {org.mentors} mentors</span><span>🎓 {org.mentees} mentees</span><span>📅 Applied {org.applied}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexShrink: 0, flexDirection: "column", alignItems: "flex-end" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => setConfirm({ org, action: "reject" })} style={{ padding: "9px 18px", borderRadius: 8, border: `1.5px solid ${T.dangerBorder}`, background: "transparent", color: T.danger, fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Reject</button>
                      <button onClick={() => setConfirm({ org, action: "approve" })} style={{ padding: "9px 18px", borderRadius: 8, border: "none", background: T.success, color: "white", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Approve</button>
                    </div>
                    <button onClick={() => setExpanded(expanded === org.id ? null : org.id)} style={{ fontSize: 12, color: T.accentMid, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
                      {expanded === org.id ? "▲ Less" : "▼ More details"}
                    </button>
                  </div>
                </div>
              </div>
              {expanded === org.id && (
                <div style={{ padding: "16px 24px 20px", borderTop: `1px solid ${T.border}`, background: T.bg }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>About</div>
                  <p style={{ fontSize: 14, color: T.text, lineHeight: 1.7 }}>{org.about}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AdminOrganisations = ({ T, orgs, onSuspend, onRestore }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const filtered = orgs.filter(o => (filter === "all" || o.status === filter) && o.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={{ padding: "32px 36px", maxWidth: 860 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: T.text, letterSpacing: "-0.03em" }}>Organisations</h1>
        <p style={{ fontSize: 14, color: T.textMuted, marginTop: 4 }}>{orgs.length} total · {orgs.filter(o => o.status === "active").length} active</p>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search organisations…" style={{ flex: 1, padding: "11px 14px", borderRadius: 10, border: `1px solid ${T.border}`, fontFamily: "inherit", fontSize: 14, background: T.surface, outline: "none", color: T.text }} />
        <div style={{ display: "flex", gap: 4, background: T.accentLight, borderRadius: 10, padding: 4 }}>
          {["all","active","suspended"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 14px", borderRadius: 7, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12.5, fontWeight: 600, background: filter === f ? T.accent : "transparent", color: filter === f ? "white" : T.textMuted, transition: "all 0.15s" }}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map(org => (
          <div key={org.id} style={{ background: T.surface, borderRadius: 14, border: `1px solid ${org.status === "suspended" ? T.dangerBorder : T.border}`, boxShadow: T.shadow, padding: "18px 22px", display: "flex", alignItems: "center", gap: 16, opacity: org.status === "suspended" ? 0.75 : 1 }}>
            <div style={{ width: 46, height: 46, borderRadius: 11, background: T.accentLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: T.accent, flexShrink: 0 }}>{org.name.charAt(0)}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 3, flexWrap: "wrap" }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: T.text }}>{org.name}</span>
                <Badge T={T} label={org.industry} />
                {org.status === "suspended" && <Badge label="Suspended" bg={T.dangerLight} color={T.danger} />}
              </div>
              <div style={{ fontSize: 12, color: T.textMuted }}>
                Code: <span style={{ fontFamily: "monospace", fontWeight: 700, color: T.accent }}>{org.code}</span>
                {" · "}{org.members} members · {org.sessions} sessions · {org.country} · Since {org.joined}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <button style={{ padding: "7px 14px", borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", color: T.textMuted, fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>View</button>
              {org.status === "active"
                ? <button onClick={() => onSuspend(org.id)} style={{ padding: "7px 14px", borderRadius: 8, border: `1.5px solid ${T.dangerBorder}`, background: "transparent", color: T.danger, fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Suspend</button>
                : <button onClick={() => onRestore(org.id)} style={{ padding: "7px 14px", borderRadius: 8, border: `1.5px solid ${T.border}`, background: T.successLight, color: T.success, fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Restore</button>}
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div style={{ textAlign: "center", padding: "48px", color: T.textMuted, fontSize: 14 }}>No organisations match your search.</div>}
      </div>
    </div>
  );
};

const AdminUsers = ({ T }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const filtered = allUsers.filter(u => (filter === "all" || u.role.toLowerCase() === filter) && (u.name.toLowerCase().includes(search.toLowerCase()) || u.org.toLowerCase().includes(search.toLowerCase())));
  return (
    <div style={{ padding: "32px 36px", maxWidth: 860 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: T.text, letterSpacing: "-0.03em" }}>All Users</h1>
        <p style={{ fontSize: 14, color: T.textMuted, marginTop: 4 }}>{allUsers.length} users across all organisations.</p>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or org…" style={{ flex: 1, padding: "11px 14px", borderRadius: 10, border: `1px solid ${T.border}`, fontFamily: "inherit", fontSize: 14, background: T.surface, outline: "none", color: T.text }} />
        <div style={{ display: "flex", gap: 4, background: T.accentLight, borderRadius: 10, padding: 4 }}>
          {[{id:"all",l:"All"},{id:"mentor",l:"Mentors"},{id:"mentee",l:"Mentees"}].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{ padding: "8px 14px", borderRadius: 7, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12.5, fontWeight: 600, background: filter === f.id ? T.accent : "transparent", color: filter === f.id ? "white" : T.textMuted, transition: "all 0.15s" }}>{f.l}</button>
          ))}
        </div>
      </div>
      <div style={{ background: T.surface, borderRadius: 14, border: `1px solid ${T.border}`, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1.5fr 1fr 80px", padding: "12px 20px", background: T.bg, borderBottom: `1px solid ${T.border}`, fontSize: 11, fontWeight: 700, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          <span>Name</span><span>Role</span><span>Organisation</span><span>Joined</span><span>Status</span>
        </div>
        {filtered.map((u, i) => (
          <div key={u.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1.5fr 1fr 80px", padding: "14px 20px", borderBottom: i < filtered.length - 1 ? `1px solid ${T.border}` : "none", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{u.name}</div>
              <div style={{ fontSize: 12, color: T.textMuted }}>{u.email}</div>
            </div>
            <Badge T={T} label={u.role} bg={u.role === "Mentor" ? T.accentLight : "oklch(96% 0.04 300)"} color={u.role === "Mentor" ? T.accent : "oklch(36% 0.10 300)"} />
            <span style={{ fontSize: 13, color: T.textMuted }}>{u.org}</span>
            <span style={{ fontSize: 13, color: T.textMuted }}>{u.joined}</span>
            <div style={{ width: 10, height: 10, borderRadius: "50%", margin: "0 auto", background: u.active ? "oklch(60% 0.16 142)" : T.border }} />
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminAnalytics = ({ T, approved }) => (
  <div style={{ padding: "32px 36px", maxWidth: 900 }}>
    <div style={{ marginBottom: 28 }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: T.text, letterSpacing: "-0.03em" }}>Analytics</h1>
      <p style={{ fontSize: 14, color: T.textMuted, marginTop: 4 }}>Platform-wide performance metrics.</p>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
      {[
        { label: "Sessions This Month", value: "234", sub: "↑ 22% vs last month" },
        { label: "Avg. Goal Progress", value: "67%", sub: "Across all active mentees" },
        { label: "Resources Shared", value: "89", sub: "This month" },
        { label: "Messages Sent", value: "1,240", sub: "This month" },
        { label: "Active Users (7d)", value: "98", sub: "69% of total users" },
        { label: "Avg. Session Length", value: "52 min", sub: "↑ 4 min vs last month" },
      ].map((s, i) => <AdminStat T={T} key={i} value={s.value} label={s.label} sub={s.sub} accent={i === 0} />)}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <div style={{ background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`, boxShadow: T.shadow, padding: "22px 24px" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 16 }}>Monthly sessions</div>
        <div style={{ display: "flex", gap: 5, alignItems: "flex-end", height: 100 }}>
          {[40,55,48,70,65,80,95,88,100,92,110,120].map((h, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <div style={{ width: "100%", height: h * 0.68, borderRadius: "3px 3px 2px 2px", background: i >= 10 ? T.accent : T.accentLight }} />
              <div style={{ fontSize: 8, color: T.textLight }}>{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`, boxShadow: T.shadow, padding: "22px 24px" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 16 }}>Top organisations by sessions</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {approved.filter(o => o.status === "active").sort((a, b) => b.sessions - a.sessions).map(org => (
            <div key={org.id}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 13 }}>
                <span style={{ fontWeight: 600, color: T.text }}>{org.name}</span>
                <span style={{ color: T.textMuted }}>{org.sessions} sessions</span>
              </div>
              <div style={{ height: 6, borderRadius: 99, background: T.accentLight, overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 99, background: T.accent, width: `${Math.round(org.sessions / 61 * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const AdminPortal = ({ onBack }) => {
  const T = getAdminTokens(310, "dark", "compact");
  const [loggedIn, setLoggedIn] = useState(false);
  const [active, setActive] = useState("overview");
  const [pending, setPending] = useState(initPending);
  const [approved, setApproved] = useState(initApproved);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type) => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const approveOrg = id => {
    const org = pending.find(o => o.id === id);
    setPending(pending.filter(o => o.id !== id));
    const code = (org.name.replace(/[^a-z]/gi,"").toUpperCase().slice(0,4).padEnd(4,"X")) + Math.floor(10+Math.random()*90);
    setApproved(prev => [...prev, { ...org, members: org.mentors + org.mentees, sessions: 0, code, joined: "May 2026", status: "active" }]);
    showToast("✓ " + org.name + " approved", "success");
  };
  const rejectOrg = id => { const org = pending.find(o => o.id === id); setPending(pending.filter(o => o.id !== id)); showToast("✕ " + org.name + " rejected", "danger"); };
  const suspendOrg = id => { setApproved(approved.map(o => o.id === id ? { ...o, status: "suspended" } : o)); showToast("Organisation suspended", "danger"); };
  const restoreOrg = id => { setApproved(approved.map(o => o.id === id ? { ...o, status: "active" } : o)); showToast("Organisation restored", "success"); };

  if (!loggedIn) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: T.sidebarBg, padding: 24 }}>
        <div style={{ width: "100%", maxWidth: 400 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36, justifyContent: "center" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center" }}><PeopleIcon /></div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: T.sidebarText, letterSpacing: "-0.02em" }}>Mentor Me</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.sidebarMuted, letterSpacing: "0.08em" }}>ADMIN PORTAL</div>
            </div>
          </div>
          <div style={{ background: T.surface, borderRadius: 20, padding: "36px", boxShadow: "0 20px 60px oklch(0% 0 0 / 0.4)" }}>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: T.text, letterSpacing: "-0.02em", marginBottom: 6 }}>Admin sign in</h1>
            <p style={{ fontSize: 14, color: T.textMuted, marginBottom: 28 }}>This portal is for Mentor Me administrators only.</p>
            <InputField label="Email" type="email" placeholder="admin@mentorme.app" value="" onChange={() => {}} T={T} />
            <InputField label="Password" type="password" placeholder="••••••••" value="" onChange={() => {}} T={T} />
            <button onClick={() => setLoggedIn(true)} style={{ width: "100%", padding: "14px", borderRadius: 10, border: "none", background: T.accentBtn, color: "white", fontFamily: "inherit", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Sign In →</button>
          </div>
          <p style={{ textAlign: "center", fontSize: 13, color: T.sidebarMuted, marginTop: 20 }}>
            Not an admin?{" "}
            <span onClick={onBack} style={{ color: "oklch(70% 0.08 240)", fontWeight: 600, cursor: "pointer" }}>Go to Mentor Me →</span>
          </p>
        </div>
      </div>
    );
  }

  const screens = {
    overview: <AdminOverview T={T} pending={pending} approved={approved} />,
    pending: <AdminPending T={T} orgs={pending} onApprove={approveOrg} onReject={rejectOrg} />,
    approved: <AdminOrganisations T={T} orgs={approved} onSuspend={suspendOrg} onRestore={restoreOrg} />,
    users: <AdminUsers T={T} />,
    stats: <AdminAnalytics T={T} approved={approved} />,
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: T.bg, overflow: "hidden" }}>
      {toast && <Toast T={T} msg={toast.msg} type={toast.type} />}
      <AdminSidebar T={T} active={active} setActive={setActive} pendingCount={pending.length} onSignOut={() => setLoggedIn(false)} />
      <div style={{ flex: 1, overflowY: "auto" }}>{screens[active]}</div>
    </div>
  );
};

// ── Auth Screens ──────────────────────────────────────────────────────────────
const AuthBrand = ({ T }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36 }}>
    <div style={{ width: 38, height: 38, borderRadius: 10, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center" }}><PeopleIcon /></div>
    <span style={{ fontSize: 20, fontWeight: 800, color: T.text, letterSpacing: "-0.03em", whiteSpace: "nowrap" }}>Mentor Me</span>
  </div>
);

const LoginScreen = ({ T, onLogin, onGoSignup, onGoAdmin }) => {
  const [role, setRole] = useState("mentee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) { setError("Please fill in all fields."); return; }
    onLogin(role);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: T.bg, padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        <AuthBrand T={T} />
        <div style={{ background: T.surface, borderRadius: 20, padding: "36px 36px 28px", border: `1px solid ${T.border}`, boxShadow: T.shadowMd }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: T.text, letterSpacing: "-0.03em", marginBottom: 6 }}>Welcome back</h1>
          <p style={{ fontSize: 14, color: T.textMuted, marginBottom: 24 }}>Sign in to your account to continue.</p>
          <div style={{ display: "flex", gap: 4, marginBottom: 24, background: T.accentLight, borderRadius: 10, padding: 4 }}>
            {[{id:"mentee",l:"Mentee"},{id:"mentor",l:"Mentor"},{id:"org",l:"Organisation"}].map(r => (
              <button key={r.id} onClick={() => setRole(r.id)} style={{ flex: 1, padding: "9px 0", borderRadius: 7, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 600, transition: "all 0.15s", background: role === r.id ? T.accent : "transparent", color: role === r.id ? "white" : T.textMuted, whiteSpace: "nowrap" }}>{r.l}</button>
            ))}
          </div>
          <InputField label="Email address" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} T={T} />
          <InputField label="Password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} T={T} />
          <div style={{ textAlign: "right", marginTop: -8, marginBottom: 20 }}>
            <span style={{ fontSize: 13, color: T.accentMid, fontWeight: 600, cursor: "pointer" }}>Forgot password?</span>
          </div>
          {error && <div style={{ fontSize: 13, color: "oklch(50% 0.18 20)", marginBottom: 14, background: "oklch(97% 0.04 20)", padding: "10px 14px", borderRadius: 8, border: "1px solid oklch(90% 0.07 20)" }}>{error}</div>}
          <button onClick={handleLogin} style={{ width: "100%", padding: "14px", borderRadius: 10, border: "none", background: T.accentBtn, color: "white", fontFamily: "inherit", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Sign In</button>
        </div>
        <p style={{ textAlign: "center", fontSize: 14, color: T.textMuted, marginTop: 24 }}>
          Don't have an account?{" "}<span onClick={onGoSignup} style={{ color: T.accent, fontWeight: 700, cursor: "pointer" }}>Create one</span>
        </p>
        <p style={{ textAlign: "center", fontSize: 12, color: T.textLight, marginTop: 12 }}>
          Are you a platform admin?{" "}<span onClick={onGoAdmin} style={{ color: T.textMuted, fontWeight: 600, cursor: "pointer" }}>Admin portal →</span>
        </p>
      </div>
    </div>
  );
};

const MemberSignup = ({ T, onSignup, onGoLogin, onGoOrgSignup }) => {
  const [role, setRole] = useState("mentee");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ orgCode: "", name: "", email: "", password: "", title: "", bio: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const StepDots = () => (
    <div style={{ display: "flex", gap: 6, marginBottom: 28, alignItems: "center" }}>
      {[1,2,3].map(s => <div key={s} style={{ width: s === step ? 28 : 8, height: 8, borderRadius: 99, background: s <= step ? T.accent : T.border, transition: "all 0.3s ease" }} />)}
      <span style={{ fontSize: 12, color: T.textMuted, marginLeft: 4, fontWeight: 500 }}>Step {step} of 3</span>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: T.bg, padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        <AuthBrand T={T} />
        <div style={{ background: T.surface, borderRadius: 20, padding: "36px 36px 28px", border: `1px solid ${T.border}`, boxShadow: T.shadowMd }}>
          <StepDots />
          {step === 1 && <>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: T.text, letterSpacing: "-0.03em", marginBottom: 6 }}>Join an organisation</h1>
            <p style={{ fontSize: 14, color: T.textMuted, marginBottom: 24 }}>Enter the code your organisation shared with you.</p>
            <div style={{ display: "flex", gap: 4, marginBottom: 22, background: T.accentLight, borderRadius: 10, padding: 4 }}>
              {[{id:"mentee",l:"Mentee"},{id:"mentor",l:"Mentor"}].map(r => (
                <button key={r.id} onClick={() => setRole(r.id)} style={{ flex: 1, padding: "9px 0", borderRadius: 7, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600, transition: "all 0.15s", background: role === r.id ? T.accent : "transparent", color: role === r.id ? "white" : T.textMuted }}>{r.l}</button>
              ))}
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 6 }}>Organisation Code</label>
              <input placeholder="e.g. RAVI42" value={form.orgCode} onChange={e => set("orgCode", e.target.value.toUpperCase())} style={{ width: "100%", padding: "14px 16px", borderRadius: 10, border: `1.5px solid ${T.border}`, fontFamily: "monospace", fontSize: 20, fontWeight: 700, letterSpacing: "0.15em", color: T.accent, background: T.bg, outline: "none", textAlign: "center" }}
                onFocus={e => e.target.style.borderColor = T.accent} onBlur={e => e.target.style.borderColor = T.border} />
              <div style={{ fontSize: 12, color: T.textMuted, marginTop: 8 }}>
                Don't have a code?{" "}<span onClick={onGoOrgSignup} style={{ color: T.accent, fontWeight: 600, cursor: "pointer" }}>Register your organisation</span>
              </div>
            </div>
            <button onClick={() => form.orgCode && setStep(2)} style={{ width: "100%", padding: "14px", borderRadius: 10, border: "none", background: form.orgCode ? T.accentBtn : T.border, color: "white", fontFamily: "inherit", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Continue →</button>
          </>}
          {step === 2 && <>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: T.text, letterSpacing: "-0.03em", marginBottom: 6 }}>Create your account</h1>
            <p style={{ fontSize: 14, color: T.textMuted, marginBottom: 22 }}>Joining as <strong>{role}</strong> in <span style={{ color: T.accent, fontFamily: "monospace", fontWeight: 700 }}>{form.orgCode}</span></p>
            <InputField label="Full name" placeholder="Your full name" value={form.name} onChange={e => set("name", e.target.value)} T={T} />
            <InputField label="Email address" type="email" placeholder="you@example.com" value={form.email} onChange={e => set("email", e.target.value)} T={T} />
            <InputField label="Password" type="password" placeholder="Create a password" value={form.password} onChange={e => set("password", e.target.value)} T={T} />
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button onClick={() => setStep(1)} style={{ padding: "14px 20px", borderRadius: 10, border: `1.5px solid ${T.border}`, background: "transparent", color: T.textMuted, fontFamily: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>← Back</button>
              <button onClick={() => (form.name && form.email && form.password) && setStep(3)} style={{ flex: 1, padding: "14px", borderRadius: 10, border: "none", background: T.accentBtn, color: "white", fontFamily: "inherit", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Continue →</button>
            </div>
          </>}
          {step === 3 && <>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: T.text, letterSpacing: "-0.03em", marginBottom: 6 }}>About you</h1>
            <p style={{ fontSize: 14, color: T.textMuted, marginBottom: 22 }}>Help {role === "mentor" ? "your mentees" : "your mentor"} know who you are.</p>
            <InputField label={role === "mentor" ? "Your expertise / title" : "Your field / role"} placeholder={role === "mentor" ? "e.g. Brand Strategy Mentor" : "e.g. Digital Marketing Strategist"} value={form.title} onChange={e => set("title", e.target.value)} T={T} />
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 6 }}>Short bio</label>
              <textarea placeholder={role === "mentor" ? "What do you mentor and who do you help?" : "What are you working on?"} value={form.bio} onChange={e => set("bio", e.target.value)} rows={3} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${T.border}`, fontFamily: "inherit", fontSize: 14, color: T.text, background: T.bg, outline: "none", resize: "vertical", lineHeight: 1.6 }}
                onFocus={e => e.target.style.borderColor = T.accent} onBlur={e => e.target.style.borderColor = T.border} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setStep(2)} style={{ padding: "14px 20px", borderRadius: 10, border: `1.5px solid ${T.border}`, background: "transparent", color: T.textMuted, fontFamily: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>← Back</button>
              <button onClick={() => onSignup(role)} style={{ flex: 1, padding: "14px", borderRadius: 10, border: "none", background: T.accentBtn, color: "white", fontFamily: "inherit", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Create Account</button>
            </div>
          </>}
        </div>
        <p style={{ textAlign: "center", fontSize: 14, color: T.textMuted, marginTop: 24 }}>
          Already have an account?{" "}<span onClick={onGoLogin} style={{ color: T.accent, fontWeight: 700, cursor: "pointer" }}>Sign in</span>
        </p>
      </div>
    </div>
  );
};

const OrgSignup = ({ T, onSignup, onGoLogin, onGoMemberSignup }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ orgName: "", industry: "", email: "", password: "" });
  const [code, setCode] = useState("");
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleCreate = () => {
    const c = (form.orgName || "ORG").replace(/[^a-z]/gi,"").toUpperCase().slice(0,4).padEnd(4,"X") + Math.floor(10+Math.random()*90);
    setCode(c);
    setStep(2);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: T.bg, padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        <AuthBrand T={T} />
        <div style={{ background: T.surface, borderRadius: 20, padding: "36px 36px 28px", border: `1px solid ${T.border}`, boxShadow: T.shadowMd }}>
          {step === 1 && <>
            <div style={{ display: "flex", gap: 6, marginBottom: 28, alignItems: "center" }}>
              <div style={{ width: 28, height: 8, borderRadius: 99, background: T.accent }} />
              <div style={{ width: 8, height: 8, borderRadius: 99, background: T.border }} />
              <span style={{ fontSize: 12, color: T.textMuted, marginLeft: 4, fontWeight: 500 }}>Step 1 of 2</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: T.text, letterSpacing: "-0.03em", marginBottom: 6 }}>Register your organisation</h1>
            <p style={{ fontSize: 14, color: T.textMuted, marginBottom: 24 }}>Set up your institution on Mentor Me and invite your team.</p>
            <InputField label="Organisation name" placeholder="e.g. Ravvis Media" value={form.orgName} onChange={e => set("orgName", e.target.value)} T={T} />
            <InputField label="Industry / Type" placeholder="e.g. Education & Training, NGO, Corporate…" value={form.industry} onChange={e => set("industry", e.target.value)} T={T} />
            <InputField label="Admin email" type="email" placeholder="admin@yourorg.com" value={form.email} onChange={e => set("email", e.target.value)} T={T} />
            <InputField label="Password" type="password" placeholder="Create a password" value={form.password} onChange={e => set("password", e.target.value)} T={T} />
            <button onClick={handleCreate} style={{ width: "100%", padding: "14px", borderRadius: 10, border: "none", background: T.accentBtn, color: "white", fontFamily: "inherit", fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 4 }}>Create Organisation →</button>
          </>}
          {step === 2 && (
            <div style={{ textAlign: "center", padding: "8px 0 20px" }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: T.accentLight, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M6 16l6 6L26 8" stroke={T.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: T.text, letterSpacing: "-0.03em", marginBottom: 8 }}>You're all set!</h1>
              <p style={{ fontSize: 14, color: T.textMuted, lineHeight: 1.6, marginBottom: 28 }}><strong>{form.orgName}</strong> is ready. Share the code below with your mentors and mentees.</p>
              <div style={{ background: T.accentLight, borderRadius: 14, padding: "24px", marginBottom: 24, border: `1.5px dashed ${T.accentMid}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Organisation Code</div>
                <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: "0.18em", fontFamily: "monospace", color: T.accent }}>{code}</div>
              </div>
              <button onClick={() => onSignup("org", form.orgName, code)} style={{ width: "100%", padding: "14px", borderRadius: 10, border: "none", background: T.accentBtn, color: "white", fontFamily: "inherit", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Go to Dashboard →</button>
            </div>
          )}
        </div>
        {step === 1 && (
          <p style={{ textAlign: "center", fontSize: 14, color: T.textMuted, marginTop: 24 }}>
            Already have an account?{" "}<span onClick={onGoLogin} style={{ color: T.accent, fontWeight: 700, cursor: "pointer" }}>Sign in</span>
            {" · "}<span onClick={onGoMemberSignup} style={{ color: T.accent, fontWeight: 700, cursor: "pointer" }}>Join as member</span>
          </p>
        )}
      </div>
    </div>
  );
};

// ── Root App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("login"); // login | member-signup | org-signup | app | admin
  const [role, setRole] = useState("mentee"); // mentee | mentor | org
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [orgName, setOrgName] = useState("Ravvis Media");
  const [orgCode, setOrgCode] = useState("RAVI42");

  const T = getTokens("light", "green");

  const signOut = () => { setScreen("login"); setActive("dashboard"); };

  if (screen === "admin") return <AdminPortal onBack={() => setScreen("login")} />;

  if (screen === "login") return <LoginScreen T={T} onLogin={r => { setRole(r); setScreen("app"); }} onGoSignup={() => setScreen("member-signup")} onGoAdmin={() => setScreen("admin")} />;

  if (screen === "member-signup") return <MemberSignup T={T} onSignup={r => { setRole(r); setScreen("app"); }} onGoLogin={() => setScreen("login")} onGoOrgSignup={() => setScreen("org-signup")} />;

  if (screen === "org-signup") return <OrgSignup T={T} onSignup={(r, name, code) => { setRole("org"); setOrgName(name); setOrgCode(code); setScreen("app"); }} onGoLogin={() => setScreen("login")} onGoMemberSignup={() => setScreen("member-signup")} />;

  if (role === "org") return <OrgApp T={T} orgName={orgName} orgCode={orgCode} onSignOut={signOut} />;

  const screens = {
    dashboard: <Dashboard T={T} role={role} />,
    sessions: <Sessions T={T} role={role} />,
    goals: <Goals T={T} />,
    messages: <MessagesScreen T={T} />,
    resources: <Resources T={T} />,
    profile: <Profile T={T} role={role} />,
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: T.bg, overflow: "hidden", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`}</style>
      <MentorMeSidebar active={active} setActive={setActive} T={T} role={role} collapsed={collapsed} setCollapsed={setCollapsed} onSignOut={signOut} />
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <TopBar title={navItems.find(n => n.id === active)?.label || "Dashboard"} T={T} />
        <div style={{ flex: 1, overflow: active === "messages" ? "hidden" : "auto", display: active === "messages" ? "flex" : "block" }}>
          {screens[active]}
        </div>
      </div>
    </div>
  );
}
