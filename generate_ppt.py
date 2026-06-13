from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.util import Inches, Pt
import copy

# ── Brand Colors ────────────────────────────────────────────────────────────
DARK_BG      = RGBColor(0x0D, 0x1B, 0x2A)   # deep navy
ACCENT_BLUE  = RGBColor(0x00, 0x8B, 0xFF)   # electric blue
ACCENT_TEAL  = RGBColor(0x00, 0xC9, 0xA7)   # teal
ACCENT_ORANGE= RGBColor(0xFF, 0x6B, 0x35)   # orange
ACCENT_PURPLE= RGBColor(0x7B, 0x2F, 0xBE)   # purple
WHITE        = RGBColor(0xFF, 0xFF, 0xFF)
LIGHT_GRAY   = RGBColor(0xB0, 0xBE, 0xC5)
CARD_BG      = RGBColor(0x14, 0x2A, 0x40)   # slightly lighter navy

prs = Presentation()
prs.slide_width  = Inches(13.33)
prs.slide_height = Inches(7.5)

BLANK = prs.slide_layouts[6]  # blank layout

# ── Helper Functions ─────────────────────────────────────────────────────────
def add_bg(slide, color=DARK_BG):
    from pptx.oxml.ns import qn
    from lxml import etree
    bg = slide.background
    fill = bg.fill
    fill.solid()
    fill.fore_color.rgb = color

def txb(slide, text, x, y, w, h, size=18, bold=False, color=WHITE,
        align=PP_ALIGN.LEFT, italic=False, wrap=True):
    tb = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = tb.text_frame
    tf.word_wrap = wrap
    p  = tf.paragraphs[0]
    p.alignment = align
    run = p.add_run()
    run.text = text
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.italic = italic
    run.font.color.rgb = color
    return tb

def rect(slide, x, y, w, h, fill_color, corner_radius=None):
    shape = slide.shapes.add_shape(
        1,  # MSO_SHAPE_TYPE.RECTANGLE
        Inches(x), Inches(y), Inches(w), Inches(h)
    )
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill_color
    shape.line.fill.background()
    return shape

def accent_bar(slide, x, y, w=0.06, h=0.35, color=ACCENT_BLUE):
    rect(slide, x, y, w, h, color)

def divider(slide, x, y, w, thickness=0.03, color=ACCENT_BLUE):
    rect(slide, x, y, w, thickness, color)

def card(slide, x, y, w, h, fill=CARD_BG):
    return rect(slide, x, y, w, h, fill)

# ════════════════════════════════════════════════════════════════════════════
# SLIDE 1 — TITLE / HERO
# ════════════════════════════════════════════════════════════════════════════
s = prs.slides.add_slide(BLANK)
add_bg(s)

# Left accent strip
rect(s, 0, 0, 0.12, 7.5, ACCENT_BLUE)

# Decorative circles
for (cx, cy, cr, col) in [
    (11.5, 0.3, 2.2, RGBColor(0x00,0x3A,0x6E)),
    (12.8, 5.8, 1.5, RGBColor(0x00,0x2A,0x50)),
]:
    sh = s.shapes.add_shape(9, Inches(cx), Inches(cy), Inches(cr), Inches(cr))
    sh.fill.solid(); sh.fill.fore_color.rgb = col
    sh.line.fill.background()

# Tagline top
txb(s, "ENTERPRISE WORKFORCE MANAGEMENT", 0.6, 0.5, 10, 0.5,
    size=11, color=ACCENT_TEAL, bold=True)

# Product Name
txb(s, "ORBIT", 0.6, 1.15, 8, 1.4, size=88, bold=True, color=WHITE)

# Underline accent
divider(s, 0.6, 2.55, 4.5, 0.07, ACCENT_BLUE)

# Subtitle
txb(s, "One Platform. Three Orbits. Total Control.", 0.6, 2.75, 9, 0.6,
    size=24, color=LIGHT_GRAY, italic=True)

# Description
txb(s,
    "A cloud-based platform that unifies project execution, workforce tracking,\n"
    "cost management, and infrastructure operations for enterprise teams.",
    0.6, 3.5, 9, 1.0, size=15, color=LIGHT_GRAY)

# Three orbit pills at bottom
pill_data = [
    ("🏗  Productivity Orbit", ACCENT_BLUE,   0.6),
    ("📡  Activity Orbit",    ACCENT_TEAL,   4.6),
    ("👥  HR Orbit",          ACCENT_ORANGE, 8.6),
]
for label, col, px in pill_data:
    rect(s, px, 5.8, 3.5, 0.65, col)
    txb(s, label, px+0.15, 5.88, 3.2, 0.5, size=14, bold=True, color=WHITE, align=PP_ALIGN.CENTER)

# Slide number
txb(s, "01", 12.8, 7.0, 0.5, 0.4, size=10, color=LIGHT_GRAY, align=PP_ALIGN.RIGHT)

# ════════════════════════════════════════════════════════════════════════════
# SLIDE 2 — THE PROBLEM
# ════════════════════════════════════════════════════════════════════════════
s = prs.slides.add_slide(BLANK)
add_bg(s)
rect(s, 0, 0, 0.12, 7.5, ACCENT_ORANGE)

txb(s, "THE PROBLEM", 0.6, 0.35, 5, 0.45, size=11, color=ACCENT_ORANGE, bold=True)
txb(s, "Why Enterprise Teams Struggle", 0.6, 0.75, 10, 0.7, size=30, bold=True, color=WHITE)
divider(s, 0.6, 1.45, 5, 0.05, ACCENT_ORANGE)

problems = [
    ("📊", "Fragmented Tools",
     "Teams juggle 5–10 disconnected tools for projects,\ntimesheets, approvals, and cost tracking."),
    ("🔍", "Zero Visibility",
     "No single view of project health, team progress,\nor real-time execution status."),
    ("💸", "Cost Overruns",
     "No structured BOQ, material tracking, or vendor\nmanagement leads to uncontrolled spending."),
    ("⏳", "Delayed Approvals",
     "Manual approval chains cause bottlenecks,\ndelaying field operations and reporting."),
    ("🏗", "Infrastructure Blind Spots",
     "EPC & tower projects lack specialized tools for\nschedule uploads, foundation tracking, and visual charts."),
    ("📁", "Lost Documentation",
     "Project documents scattered across emails,\ndrives, and local folders — nothing is centralized."),
]

cols = [(0.5, 2.0), (4.55, 2.0), (8.6, 2.0),
        (0.5, 4.55), (4.55, 4.55), (8.6, 4.55)]
for i, (emoji, title, desc) in enumerate(problems):
    cx, cy = cols[i]
    card(s, cx, cy, 3.8, 2.3)
    txb(s, emoji, cx+0.2, cy+0.15, 0.6, 0.5, size=22)
    txb(s, title, cx+0.85, cy+0.18, 2.8, 0.4, size=13, bold=True, color=ACCENT_ORANGE)
    txb(s, desc,  cx+0.2, cy+0.65, 3.4, 1.5, size=11, color=LIGHT_GRAY)

txb(s, "02", 12.8, 7.0, 0.5, 0.4, size=10, color=LIGHT_GRAY, align=PP_ALIGN.RIGHT)

# ════════════════════════════════════════════════════════════════════════════
# SLIDE 3 — THE SOLUTION
# ════════════════════════════════════════════════════════════════════════════
s = prs.slides.add_slide(BLANK)
add_bg(s)
rect(s, 0, 0, 0.12, 7.5, ACCENT_TEAL)

txb(s, "THE SOLUTION", 0.6, 0.35, 5, 0.45, size=11, color=ACCENT_TEAL, bold=True)
txb(s, "Introducing ORBIT", 0.6, 0.75, 10, 0.7, size=30, bold=True, color=WHITE)
divider(s, 0.6, 1.45, 5, 0.05, ACCENT_TEAL)

txb(s,
    "ORBIT is a unified, cloud-based enterprise platform that replaces fragmented toolsets with a single\n"
    "intelligent workspace — built specifically for construction, EPC, telecom, and infrastructure industries.",
    0.6, 1.6, 12.2, 0.85, size=14, color=LIGHT_GRAY)

# Big center value props
props = [
    ("🎯", "ONE Platform",     "Everything from project creation to invoicing lives in a single system."),
    ("⚡", "REAL-TIME",         "Live tracking of tasks, progress, approvals, and costs — no lag."),
    ("🔧", "CONFIGURABLE",      "Customizable workflows, columns, approval chains, and dashboards."),
    ("📐", "STRUCTURED",        "Three-level WBS, dependency management, baselines, and critical path."),
]
for i, (em, title, desc) in enumerate(props):
    cx = 0.5 + i * 3.2
    card(s, cx, 2.6, 3.0, 2.8)
    accent_bar(s, cx, 2.6, 0.07, 2.8, ACCENT_TEAL)
    txb(s, em,    cx+0.3, 2.75, 0.7, 0.6, size=28)
    txb(s, title, cx+0.3, 3.4,  2.5, 0.45, size=14, bold=True, color=ACCENT_TEAL)
    txb(s, desc,  cx+0.3, 3.9,  2.6, 1.3, size=11, color=LIGHT_GRAY)

# Bottom statement
rect(s, 0.5, 5.65, 12.3, 1.0, ACCENT_TEAL)
txb(s,
    "\"From planning to execution to cost control — ORBIT gives every stakeholder exactly what they need.\"",
    0.8, 5.82, 11.8, 0.65, size=14, bold=True, color=DARK_BG, align=PP_ALIGN.CENTER)

txb(s, "03", 12.8, 7.0, 0.5, 0.4, size=10, color=LIGHT_GRAY, align=PP_ALIGN.RIGHT)

# ════════════════════════════════════════════════════════════════════════════
# SLIDE 4 — HOW IT WORKS
# ════════════════════════════════════════════════════════════════════════════
s = prs.slides.add_slide(BLANK)
add_bg(s)
rect(s, 0, 0, 0.12, 7.5, ACCENT_BLUE)

txb(s, "HOW IT WORKS", 0.6, 0.35, 5, 0.45, size=11, color=ACCENT_BLUE, bold=True)
txb(s, "From Sign-In to Full Control", 0.6, 0.75, 10, 0.7, size=30, bold=True, color=WHITE)
divider(s, 0.6, 1.45, 5, 0.05, ACCENT_BLUE)

steps = [
    (ACCENT_BLUE,   "01", "Login & Orbit\nSelection",
     "Users sign in and choose their workspace — Productivity, Activity, or HR Orbit."),
    (ACCENT_TEAL,   "02", "Project &\nWBS Setup",
     "Create projects, define Work Breakdown Structure (Activities → Tasks → Sub-Tasks), assign teams."),
    (ACCENT_ORANGE, "03", "Execute &\nTrack Daily",
     "Teams log progress, submit timesheets, update task status. Managers see it all in real time."),
    (ACCENT_PURPLE, "04", "Approve &\nValidate",
     "Configurable approval chains (QC + Multi-level) ensure quality before work is accepted."),
    (ACCENT_BLUE,   "05", "Cost &\nVendor Control",
     "BOQ, material lifecycle, and vendor mapping keep project financials fully visible and controlled."),
    (ACCENT_TEAL,   "06", "Analyse &\nDecide",
     "Dashboards, Gantt baselines, critical path, and AI-powered analytics drive smarter decisions."),
]

for i, (col, num, title, desc) in enumerate(steps):
    row = i // 3
    col_x = 0.5 + (i % 3) * 4.25
    cy = 1.75 + row * 2.6
    card(s, col_x, cy, 4.0, 2.35)
    # Number badge
    badge = s.shapes.add_shape(9, Inches(col_x+0.25), Inches(cy+0.2), Inches(0.52), Inches(0.52))
    badge.fill.solid(); badge.fill.fore_color.rgb = col; badge.line.fill.background()
    txb(s, num, col_x+0.26, cy+0.22, 0.5, 0.42, size=12, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
    txb(s, title, col_x+0.9,  cy+0.18, 2.9, 0.65, size=13, bold=True, color=col)
    txb(s, desc,  col_x+0.25, cy+0.9,  3.55, 1.25, size=11, color=LIGHT_GRAY)
    # Connector arrow (not last in row)
    if i % 3 != 2:
        txb(s, "→", col_x+4.0, cy+0.85, 0.3, 0.4, size=20, color=col, align=PP_ALIGN.CENTER)

txb(s, "04", 12.8, 7.0, 0.5, 0.4, size=10, color=LIGHT_GRAY, align=PP_ALIGN.RIGHT)

# ════════════════════════════════════════════════════════════════════════════
# SLIDE 5 — THREE ORBITS OVERVIEW
# ════════════════════════════════════════════════════════════════════════════
s = prs.slides.add_slide(BLANK)
add_bg(s)
rect(s, 0, 0, 0.12, 7.5, ACCENT_PURPLE)

txb(s, "PRODUCT ARCHITECTURE", 0.6, 0.35, 6, 0.45, size=11, color=ACCENT_PURPLE, bold=True)
txb(s, "Three Orbits. One Ecosystem.", 0.6, 0.75, 10, 0.7, size=30, bold=True, color=WHITE)
divider(s, 0.6, 1.45, 6, 0.05, ACCENT_PURPLE)

txb(s,
    "ORBIT is structured around three specialized workspaces, each designed for a distinct operational role.",
    0.6, 1.6, 12.2, 0.5, size=14, color=LIGHT_GRAY)

orbits = [
    (ACCENT_BLUE,   "🏗",  "PRODUCTIVITY\nORBIT",
     "For project managers, planners & field teams",
     ["Project Center & WBS",
      "Assignments & Timesheets",
      "Goals & Milestones",
      "Cost Center & BOQ",
      "Approvals & Dashboards"]),
    (ACCENT_TEAL,   "📡", "ACTIVITY\nORBIT",
     "For EPC, telecom & infrastructure operations",
     ["Tower Schedule Management",
      "Foundation Matrix",
      "L2 Gantt Schedule",
      "Tower Progress Tracking",
      "Visual Chart & Reporting"]),
    (ACCENT_ORANGE, "👥", "HR\nORBIT",
     "For HR teams & people operations",
     ["Employee Lifecycle",
      "Onboarding Workflows",
      "Leave & Attendance",
      "Performance Tracking",
      "Payroll Integration"]),
]

for i, (col, em, title, sub, modules) in enumerate(orbits):
    cx = 0.5 + i * 4.25
    # Header card
    rect(s, cx, 2.2, 4.0, 1.5, col)
    txb(s, em,    cx+0.2, 2.25, 0.7, 0.8, size=30)
    txb(s, title, cx+0.9, 2.28, 2.9, 0.75, size=16, bold=True, color=WHITE)
    txb(s, sub,   cx+0.9, 2.98, 2.9, 0.55, size=10, color=DARK_BG, italic=True)
    # Module list card
    card(s, cx, 3.75, 4.0, 3.2)
    accent_bar(s, cx, 3.75, 0.07, 3.2, col)
    for j, mod in enumerate(modules):
        txb(s, f"◆  {mod}", cx+0.25, 3.9 + j*0.55, 3.6, 0.48, size=11.5, color=WHITE)

txb(s, "05", 12.8, 7.0, 0.5, 0.4, size=10, color=LIGHT_GRAY, align=PP_ALIGN.RIGHT)

# ════════════════════════════════════════════════════════════════════════════
# SLIDE 6 — PRODUCTIVITY ORBIT DEEP DIVE
# ════════════════════════════════════════════════════════════════════════════
s = prs.slides.add_slide(BLANK)
add_bg(s)
rect(s, 0, 0, 0.12, 7.5, ACCENT_BLUE)

txb(s, "PRODUCTIVITY ORBIT", 0.6, 0.35, 8, 0.45, size=11, color=ACCENT_BLUE, bold=True)
txb(s, "Complete Project Execution Suite", 0.6, 0.75, 10, 0.7, size=30, bold=True, color=WHITE)
divider(s, 0.6, 1.45, 6, 0.05, ACCENT_BLUE)

modules = [
    ("📋", "Project Center",
     "Create, manage & archive projects with templates, project groups, and customizable column views."),
    ("🗂", "Work Breakdown Structure",
     "3-level hierarchy (Activity→Task→Sub-Task). List, Kanban Board, Gantt & Overview views."),
    ("📌", "Assignments",
     "Consolidated workspace for user-assigned work. Progress tracking, daily reports, time logging."),
    ("⏱", "Timesheets",
     "Log work hours, save drafts, submit for approval. Multi-level approval with status tracking."),
    ("✅", "Approvals",
     "Configurable modes: QC Only, QC+Approval, Approval Only. Single or multi-level chains."),
    ("🎯", "Goals & Milestones",
     "High-level objectives with 3 milestone types: Activity-based, Number-based, True/False."),
    ("💰", "Cost Center",
     "BOQ with auto-calc, Material Lifecycle Tracking (Planning→Procurement→Consumption)."),
    ("📄", "Document Repository",
     "Centralized docs from planning, assignments & uploads. Official vs. Personal categories."),
    ("🏢", "Vendor Management",
     "Register vendors, map to labor/material types. Legal, banking & compliance tracking."),
    ("📊", "Dashboards & Analytics",
     "EPC Dashboard, AI-powered Analytics, Visual Charts. My View & Project View modes."),
]

cols_layout = [(0.5, 2.0), (4.55, 2.0), (8.6, 2.0),
               (0.5, 3.75),(4.55, 3.75),(8.6, 3.75),
               (0.5, 5.5), (4.55, 5.5),(8.6, 5.5)]
# use 9 of 10, last one overflows - do 2 rows of 5 instead
rows = [(0.5, 2.0),(3.05, 2.0),(5.6, 2.0),(8.15, 2.0),(10.7, 2.0),
        (0.5, 4.2),(3.05, 4.2),(5.6, 4.2),(8.15, 4.2),(10.7, 4.2)]

for i, (em, title, desc) in enumerate(modules):
    if i >= len(rows): break
    cx, cy = rows[i]
    card(s, cx, cy, 2.45, 2.0)
    txb(s, em,    cx+0.15, cy+0.12, 0.5,  0.45, size=18)
    txb(s, title, cx+0.15, cy+0.6,  2.15, 0.42, size=11, bold=True, color=ACCENT_BLUE)
    txb(s, desc,  cx+0.15, cy+1.05, 2.15, 0.85, size=9.5, color=LIGHT_GRAY)

txb(s, "06", 12.8, 7.0, 0.5, 0.4, size=10, color=LIGHT_GRAY, align=PP_ALIGN.RIGHT)

# ════════════════════════════════════════════════════════════════════════════
# SLIDE 7 — WBS DEEP DIVE
# ════════════════════════════════════════════════════════════════════════════
s = prs.slides.add_slide(BLANK)
add_bg(s)
rect(s, 0, 0, 0.12, 7.5, ACCENT_BLUE)

txb(s, "WORK BREAKDOWN STRUCTURE", 0.6, 0.35, 8, 0.45, size=11, color=ACCENT_BLUE, bold=True)
txb(s, "The Core of Project Execution", 0.6, 0.75, 10, 0.7, size=30, bold=True, color=WHITE)
divider(s, 0.6, 1.45, 6, 0.05, ACCENT_BLUE)

# Hierarchy visual
hier = [
    (0.7, 2.0, 3.5, 0.7, ACCENT_BLUE,   "🏗  ACTIVITY",  "Top-level deliverable / phase"),
    (1.5, 3.0, 3.0, 0.65, ACCENT_TEAL,  "📋  TASK",       "Work package under activity"),
    (2.3, 3.95,2.5, 0.6,  ACCENT_ORANGE,"⚙   SUB-TASK",  "Granular execution item"),
]
for (bx, by, bw, bh, col, lbl, sub) in hier:
    rect(s, bx, by, bw, bh, col)
    txb(s, lbl, bx+0.15, by+0.08, bw-0.3, 0.38, size=13, bold=True, color=WHITE)
    txb(s, sub, bx+0.15, by+0.42, bw-0.3, 0.28, size=9,  color=DARK_BG)
# arrows
for ay in [2.72, 3.67]:
    txb(s, "↓", 1.8, ay, 0.4, 0.32, size=18, color=LIGHT_GRAY, align=PP_ALIGN.CENTER)

# Views
views = [
    (ACCENT_BLUE,   "📋", "List View",
     "Hierarchical table with inline editing, search, bulk import/export, and 11 customizable columns."),
    (ACCENT_TEAL,   "🗂", "Board View\n(Kanban)",
     "Cards grouped by Status / Priority / Due Date / Assignee. Overdue, Assigned, Unassigned filters."),
    (ACCENT_ORANGE, "📅", "Gantt View",
     "Timeline bars with baseline overlay, Today indicator, critical path, and Weekly/Monthly scale."),
    (ACCENT_PURPLE, "🔗", "Dependency\nManagement",
     "SS / FF / FS / SF relationships. Circular dependency prevention. Blocking & blocked counts."),
]
for i, (col, em, title, desc) in enumerate(views):
    cx = 5.5 + (i % 2) * 3.85
    cy = 1.85 + (i // 2) * 2.7
    card(s, cx, cy, 3.65, 2.45)
    accent_bar(s, cx, cy, 0.07, 2.45, col)
    txb(s, em,    cx+0.25, cy+0.2,  0.6,  0.6,  size=24)
    txb(s, title, cx+0.9,  cy+0.22, 2.55, 0.55, size=13, bold=True, color=col)
    txb(s, desc,  cx+0.25, cy+0.85, 3.25, 1.45, size=11, color=LIGHT_GRAY)

# Additional features
feats = ["📸 Baseline Snapshots (up to 4-way comparison)",
         "🔴 Critical Path Analysis (ES/EF/LS/LF/Float)",
         "📊 WBS Overview Dashboard"]
for i, f in enumerate(feats):
    txb(s, f, 0.65, 4.75 + i*0.52, 4.8, 0.45, size=11, color=LIGHT_GRAY)

txb(s, "07", 12.8, 7.0, 0.5, 0.4, size=10, color=LIGHT_GRAY, align=PP_ALIGN.RIGHT)

# ════════════════════════════════════════════════════════════════════════════
# SLIDE 8 — ACTIVITY ORBIT
# ════════════════════════════════════════════════════════════════════════════
s = prs.slides.add_slide(BLANK)
add_bg(s)
rect(s, 0, 0, 0.12, 7.5, ACCENT_TEAL)

txb(s, "ACTIVITY ORBIT", 0.6, 0.35, 8, 0.45, size=11, color=ACCENT_TEAL, bold=True)
txb(s, "Built for Tower & Infrastructure Operations", 0.6, 0.75, 12, 0.7, size=30, bold=True, color=WHITE)
divider(s, 0.6, 1.45, 7, 0.05, ACCENT_TEAL)

txb(s,
    "The Activity Orbit is purpose-built for EPC, telecom, and transmission-line construction companies\n"
    "managing large-scale tower and infrastructure projects at field level.",
    0.6, 1.6, 12.2, 0.75, size=13, color=LIGHT_GRAY)

act_modules = [
    ("📡", "Tower Schedule\nManagement",
     "Upload tower data: AP No., span distances, weight spans (cold/hot), wind span, coordinates, "
     "crossing type. Full approval workflow with status tracking."),
    ("🔩", "Foundation Matrix",
     "Manage foundation and material specifications per tower: Tower Type, Leg Extension, Soil Type, "
     "Excavation volume, Steel, Stub, Nut Bolt, Height."),
    ("📅", "L2 Schedule\n(Gantt-based)",
     "Supply and Construction phase scheduling with Gantt visualization. "
     "Status filters: Planned / In Progress / Completed / Delayed."),
    ("📈", "Tower Progress\nTracking",
     "Tower-wise activity tracking across Foundation, Erection, Welding, Conductor Stringing, OPGW. "
     "Summary: Total Towers, Completed, Last Updated."),
    ("🗺", "Visual Chart",
     "Interactive tower map with activity-wise progress breakdown. "
     "Color-coded status: ROW, Revetment, Foundation, Erection, Insulation, Stringing, OPGW, Earthing."),
]

for i, (em, title, desc) in enumerate(act_modules):
    col_x = 0.5 + (i % 3) * 4.25
    cy = 2.55 + (i // 3) * 2.35
    card(s, col_x, cy, 4.0, 2.2)
    accent_bar(s, col_x, cy, 0.07, 2.2, ACCENT_TEAL)
    txb(s, em,    col_x+0.25, cy+0.15, 0.6,  0.6,  size=24)
    txb(s, title, col_x+0.9,  cy+0.18, 2.9,  0.6,  size=12.5, bold=True, color=ACCENT_TEAL)
    txb(s, desc,  col_x+0.25, cy+0.85, 3.6,  1.2,  size=10,   color=LIGHT_GRAY)

txb(s, "08", 12.8, 7.0, 0.5, 0.4, size=10, color=LIGHT_GRAY, align=PP_ALIGN.RIGHT)

# ════════════════════════════════════════════════════════════════════════════
# SLIDE 9 — COST CENTER & VENDOR
# ════════════════════════════════════════════════════════════════════════════
s = prs.slides.add_slide(BLANK)
add_bg(s)
rect(s, 0, 0, 0.12, 7.5, ACCENT_ORANGE)

txb(s, "COST CENTER & VENDOR MANAGEMENT", 0.6, 0.35, 9, 0.45, size=11, color=ACCENT_ORANGE, bold=True)
txb(s, "Full Financial Visibility & Control", 0.6, 0.75, 10, 0.7, size=30, bold=True, color=WHITE)
divider(s, 0.6, 1.45, 7, 0.05, ACCENT_ORANGE)

# Left: BOQ
card(s, 0.5, 1.7, 6.0, 2.5)
accent_bar(s, 0.5, 1.7, 0.07, 2.5, ACCENT_ORANGE)
txb(s, "💰  Bill of Quantities (BOQ)", 0.7, 1.85, 5.5, 0.5, size=14, bold=True, color=ACCENT_ORANGE)
boq_items = [
    "Contract Amount = QTY × Rate + GST  (auto-calculated)",
    "Variance = Contract Amount − Tower Schedule",
    "Supply & Construction cost items tracked separately",
    "Full BOQ Approval workflow (Reviewer → Approve / Reject)",
]
for i, item in enumerate(boq_items):
    txb(s, f"▸  {item}", 0.7, 2.4+i*0.43, 5.5, 0.38, size=11, color=LIGHT_GRAY)

# Right: Material Lifecycle
card(s, 6.8, 1.7, 6.0, 2.5)
accent_bar(s, 6.8, 1.7, 0.07, 2.5, ACCENT_TEAL)
txb(s, "🔄  Material Lifecycle Tracking", 7.0, 1.85, 5.5, 0.5, size=14, bold=True, color=ACCENT_TEAL)
stages = [("📐 BOQ Baseline", "Planned quantities from BOQ"),
          ("📦 Issue Tracking", "Material released from Planning"),
          ("⚙  Consumption", "Actual usage from Assignments"),
          ("✅ Final Control", "Auto-calculated variance")]
for i, (stage, detail) in enumerate(stages):
    txb(s, stage,  7.0, 2.4+i*0.43, 2.2, 0.38, size=11, bold=True, color=ACCENT_TEAL)
    txb(s, detail, 9.4, 2.4+i*0.43, 3.2, 0.38, size=11, color=LIGHT_GRAY)

# Bottom: Vendor Management
card(s, 0.5, 4.4, 5.8, 2.7)
accent_bar(s, 0.5, 4.4, 0.07, 2.7, ACCENT_ORANGE)
txb(s, "🏢  Vendor Management", 0.7, 4.55, 5.3, 0.45, size=14, bold=True, color=ACCENT_ORANGE)
vendor_pts = [
    "Vendor Type: Strategic / Operational / Service Partner / Material Supplier",
    "Full registration: Basic, Legal (GST/PAN/MSME), Contact, Banking (IFSC)",
    "Labor Type Mapping — link vendor to labor categories",
    "Material Mapping — link vendor to approved materials",
]
for i, pt in enumerate(vendor_pts):
    txb(s, f"◆  {pt}", 0.7, 5.08+i*0.5, 5.4, 0.42, size=10.5, color=LIGHT_GRAY)

# Doc repo
card(s, 6.6, 4.4, 6.2, 2.7)
accent_bar(s, 6.6, 4.4, 0.07, 2.7, ACCENT_PURPLE)
txb(s, "📁  Document Repository", 6.8, 4.55, 5.8, 0.45, size=14, bold=True, color=ACCENT_PURPLE)
doc_pts = [
    "Centralizes docs from Planning, Assignments & direct uploads",
    "Official (team-visible) vs. Personal (private) categories",
    "Filter by type: Drawing / Checklist / Invoice / Report / Photo",
    "List View & By-Type View  |  Preview & Download",
]
for i, pt in enumerate(doc_pts):
    txb(s, f"◆  {pt}", 6.8, 5.08+i*0.5, 5.8, 0.42, size=10.5, color=LIGHT_GRAY)

txb(s, "09", 12.8, 7.0, 0.5, 0.4, size=10, color=LIGHT_GRAY, align=PP_ALIGN.RIGHT)

# ════════════════════════════════════════════════════════════════════════════
# SLIDE 10 — KEY DIFFERENTIATORS
# ════════════════════════════════════════════════════════════════════════════
s = prs.slides.add_slide(BLANK)
add_bg(s)
rect(s, 0, 0, 0.12, 7.5, ACCENT_PURPLE)

txb(s, "WHY ORBIT", 0.6, 0.35, 5, 0.45, size=11, color=ACCENT_PURPLE, bold=True)
txb(s, "What Makes Us Different", 0.6, 0.75, 10, 0.7, size=30, bold=True, color=WHITE)
divider(s, 0.6, 1.45, 5, 0.05, ACCENT_PURPLE)

diffs = [
    (ACCENT_BLUE,   "🎯", "Industry-Specific",
     "Not a generic PM tool. Built with EPC, telecom & construction workflows at its core."),
    (ACCENT_TEAL,   "🔀", "Multi-View Flexibility",
     "Every module supports List, Kanban, Gantt, and Card views — teams work the way they want."),
    (ACCENT_ORANGE, "🔗", "End-to-End Traceability",
     "From project plan to material consumption to invoice — every data point is connected."),
    (ACCENT_PURPLE, "🛡", "Structured Approvals",
     "Configurable QC + multi-level approval chains with rework loops and audit trails."),
    (ACCENT_BLUE,   "📸", "Plan vs. Actual",
     "Baseline snapshots and critical path analysis give instant plan-vs-reality comparison."),
    (ACCENT_TEAL,   "🤖", "AI-Powered Insights",
     "Analytics dashboard with AI widgets surfaces risks, bottlenecks, and opportunities."),
]

for i, (col, em, title, desc) in enumerate(diffs):
    col_x = 0.5 + (i % 3) * 4.25
    cy = 1.9 + (i // 3) * 2.5
    card(s, col_x, cy, 4.0, 2.25)
    # Left color strip
    rect(s, col_x, cy, 0.07, 2.25, col)
    txb(s, em,    col_x+0.25, cy+0.2,  0.6,  0.6,  size=26)
    txb(s, title, col_x+0.9,  cy+0.22, 2.9,  0.5,  size=13, bold=True, color=col)
    txb(s, desc,  col_x+0.25, cy+0.85, 3.6,  1.25, size=11, color=LIGHT_GRAY)

txb(s, "10", 12.8, 7.0, 0.5, 0.4, size=10, color=LIGHT_GRAY, align=PP_ALIGN.RIGHT)

# ════════════════════════════════════════════════════════════════════════════
# SLIDE 11 — CLOSING / THANK YOU
# ════════════════════════════════════════════════════════════════════════════
s = prs.slides.add_slide(BLANK)
add_bg(s)

# Full-width gradient-like accent
rect(s, 0, 0, 13.33, 0.12, ACCENT_BLUE)
rect(s, 0, 7.38, 13.33, 0.12, ACCENT_TEAL)

# Background circle decoration
for (cx, cy, cr, col) in [
    (0.5, 5.5, 3.0, RGBColor(0x00,0x2A,0x50)),
    (10.5, 0.5, 4.0, RGBColor(0x00,0x3A,0x6E)),
]:
    sh = s.shapes.add_shape(9, Inches(cx), Inches(cy), Inches(cr), Inches(cr))
    sh.fill.solid(); sh.fill.fore_color.rgb = col; sh.line.fill.background()

txb(s, "ORBIT", 3.5, 1.4, 6.5, 1.6, size=90, bold=True, color=WHITE, align=PP_ALIGN.CENTER)

divider(s, 3.5, 3.0, 6.5, 0.07, ACCENT_BLUE)

txb(s, "One Platform. Three Orbits. Total Control.",
    2.5, 3.2, 8.5, 0.6, size=20, italic=True, color=LIGHT_GRAY, align=PP_ALIGN.CENTER)

txb(s,
    "Empowering enterprise teams to plan smarter, execute faster,\n"
    "and deliver projects with complete visibility and control.",
    2.5, 3.95, 8.5, 0.9, size=15, color=LIGHT_GRAY, align=PP_ALIGN.CENTER)

# Three orbit badges
badge_data = [
    ("🏗  Productivity", ACCENT_BLUE,   3.3),
    ("📡  Activity",     ACCENT_TEAL,   6.0),
    ("👥  HR",           ACCENT_ORANGE, 8.7),
]
for label, col, bx in badge_data:
    rect(s, bx, 5.1, 2.9, 0.65, col)
    txb(s, label, bx+0.15, 5.18, 2.6, 0.48, size=14, bold=True, color=WHITE, align=PP_ALIGN.CENTER)

txb(s, "Thank You", 4.0, 6.0, 5.5, 0.6, size=22, bold=True, color=ACCENT_TEAL, align=PP_ALIGN.CENTER)
txb(s, "11", 12.8, 7.0, 0.5, 0.4, size=10, color=LIGHT_GRAY, align=PP_ALIGN.RIGHT)

# ── Save ────────────────────────────────────────────────────────────────────
output = "/home/user/Web-Clone/ORBIT_Product_Presentation.pptx"
prs.save(output)
print(f"Saved: {output}")
