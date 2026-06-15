"""
WFM Platform Generic PPT — built on 2f70db6d-Inventia_Template_V1.0_2.pptx
Style: match template exactly (brand blue #1E8ACB, Calibri, white cards)
"""
from pptx import Presentation
from pptx.util import Emu, Pt
from pptx.dml.color import RGBColor
from pptx.oxml.ns import qn
from pptx.enum.text import PP_ALIGN
from pptx.util import Inches
import copy

TEMPLATE = "/root/.claude/uploads/b5947347-19f1-59d7-8db3-07624bf3b17b/2f70db6d-Inventia_Template_V1.0_2.pptx"
OUTPUT   = "/home/user/Web-Clone/WFM_Platform_v3.pptx"

# ── Colors ──────────────────────────────────────────────────────────────────
C_BLUE   = RGBColor(0x1E, 0x8A, 0xCB)   # Inventia brand blue
C_DBLUE  = RGBColor(0x1A, 0x3A, 0x5C)   # dark navy
C_TEAL   = RGBColor(0x12, 0xA8, 0xBC)   # teal accent
C_WHITE  = RGBColor(0xFF, 0xFF, 0xFF)
C_BODY   = RGBColor(0x1C, 0x2A, 0x38)   # dark body text
C_MUTED  = RGBColor(0x5E, 0x6E, 0x7C)   # secondary / muted text
C_BORDER = RGBColor(0xD6, 0xE4, 0xF0)   # card border (light blue-grey)
C_CARD   = RGBColor(0xF4, 0xF8, 0xFD)   # card fill (very light blue)
C_IBLUE  = RGBColor(0xD0, 0xE8, 0xF5)   # icon bg light blue
C_ITEAL  = RGBColor(0xD0, 0xF0, 0xF4)   # icon bg light teal
C_LINE   = RGBColor(0xB8, 0xD4, 0xE8)   # divider line

# ── Layout / Safe Zone ───────────────────────────────────────────────────────
SW = 12192000   # slide width
SH = 6858000    # slide height
CONTENT_TOP  = 1750000   # below header image (header H=1,600,200)
CONTENT_BOT  = 5820000   # above footer group (footer T=6,025,896)
MARGIN_L     = 548640    # left margin
MARGIN_R     = 548640
CONTENT_W    = SW - MARGIN_L - MARGIN_R   # 11,094,720

# ── Helpers ──────────────────────────────────────────────────────────────────
def del_slide(prs, idx):
    sldIdLst = prs.slides._sldIdLst
    sId = sldIdLst[idx]
    rId = sId.get(qn('r:id'))
    sldIdLst.remove(sId)
    prs.part.drop_rel(rId)

def add_slide(prs, layout_idx=1):
    return prs.slides.add_slide(prs.slide_layouts[layout_idx])

def rect(slide, l, t, w, h, fill, border=None, bw=12700, alpha=None):
    from pptx.util import Emu as E
    s = slide.shapes.add_shape(1, E(l), E(t), E(w), E(h))
    s.fill.solid()
    s.fill.fore_color.rgb = fill
    if border:
        s.line.color.rgb = border
        s.line.width = E(bw)
    else:
        s.line.fill.background()
    return s

def line_shape(slide, l, t, w, color, thickness=12700):
    s = slide.shapes.add_shape(1, Emu(l), Emu(t), Emu(w), Emu(thickness))
    s.fill.solid()
    s.fill.fore_color.rgb = color
    s.line.fill.background()
    return s

def txb(slide, text, l, t, w, h, size_pt, bold=False, color=C_BODY,
        align=PP_ALIGN.LEFT, italic=False, wrap=True):
    tb = slide.shapes.add_textbox(Emu(l), Emu(t), Emu(w), Emu(h))
    tf = tb.text_frame
    tf.word_wrap = wrap
    p = tf.paragraphs[0]
    p.alignment = align
    run = p.add_run()
    run.text = text
    run.font.size = Pt(size_pt)
    run.font.bold = bold
    run.font.italic = italic
    run.font.color.rgb = color
    run.font.name = "Calibri"
    return tb

def txb_multiline(slide, lines, l, t, w, h, size_pt, bold=False, color=C_BODY,
                  align=PP_ALIGN.LEFT, line_spacing_pt=6):
    tb = slide.shapes.add_textbox(Emu(l), Emu(t), Emu(w), Emu(h))
    tf = tb.text_frame
    tf.word_wrap = True
    for i, line in enumerate(lines):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        p.space_after = Pt(line_spacing_pt)
        run = p.add_run()
        run.text = line
        run.font.size = Pt(size_pt)
        run.font.bold = bold
        run.font.color.rgb = color
        run.font.name = "Calibri"
    return tb

def section_header(slide, label, title):
    """Blue section label + large title below header image."""
    # thin blue accent line below header
    line_shape(slide, MARGIN_L, CONTENT_TOP - 60000, CONTENT_W, C_BLUE, 18000)
    # section label (all caps, blue, small)
    txb(slide, label.upper(), MARGIN_L, CONTENT_TOP - 10000, CONTENT_W, 200000,
        10, bold=True, color=C_BLUE)
    # main title
    txb(slide, title, MARGIN_L, CONTENT_TOP + 50000, CONTENT_W, 380000,
        26, bold=True, color=C_DBLUE)

def bullet_run(para, text, size_pt, color, bold=False, bullet_char="›  "):
    run = para.add_run()
    run.text = bullet_char + text
    run.font.size = Pt(size_pt)
    run.font.bold = bold
    run.font.color.rgb = color
    run.font.name = "Calibri"

# ── Slide builders ───────────────────────────────────────────────────────────

def slide_title(prs):
    slide = add_slide(prs, 0)   # Title layout
    # Main product name — large, centered-ish, positioned in safe area
    txb(slide, "Workforce Management", 758756, 2000000, 10674488, 600000,
        40, bold=True, color=C_BLUE)
    txb(slide, "Platform", 758756, 2560000, 10674488, 500000,
        40, bold=True, color=C_DBLUE)
    txb(slide, "Plan Smarter. Execute Faster. Deliver More.",
        758756, 3150000, 10674488, 350000, 18, color=C_MUTED)
    # thin separator
    line_shape(slide, 758756, 3560000, 5000000, C_BLUE, 12700)
    txb(slide, "Inventia  ·  2025", 758756, 3650000, 4000000, 250000,
        11, color=C_MUTED)
    return slide

def slide_overview(prs):
    slide = add_slide(prs)
    section_header(slide, "Platform Overview", "One Platform. Every Team. Every Project.")

    # 3 stat boxes across
    stats = [
        ("3×", "Faster\nProject Planning"),
        ("40%", "Reduction in\nAdmin Overhead"),
        ("100%", "Real-Time\nVisibility"),
    ]
    BOX_W = 3200000; BOX_H = 1500000
    GAP   = 270000
    total = len(stats) * BOX_W + (len(stats)-1) * GAP
    start_l = (SW - total) // 2

    for i, (num, label) in enumerate(stats):
        bx = start_l + i * (BOX_W + GAP)
        by = CONTENT_TOP + 500000
        rect(slide, bx, by, BOX_W, BOX_H, C_CARD, C_BORDER, 12700)
        # colored top bar
        rect(slide, bx, by, BOX_W, 60000, C_BLUE)
        txb(slide, num, bx, by + 150000, BOX_W, 500000, 38, bold=True,
            color=C_BLUE, align=PP_ALIGN.CENTER)
        txb(slide, label, bx, by + 680000, BOX_W, 400000, 13,
            color=C_BODY, align=PP_ALIGN.CENTER)

    # body text below stats
    body = ("The Workforce Management Platform is a unified solution for planning, "
            "executing, and tracking projects across industries. From individual task "
            "management to portfolio-level dashboards, it gives every team member "
            "and every manager exactly the visibility they need.")
    txb(slide, body, MARGIN_L, CONTENT_TOP + 2200000, CONTENT_W, 800000,
        13, color=C_MUTED)
    return slide

def slide_problem(prs):
    slide = add_slide(prs)
    section_header(slide, "The Challenge", "Why Teams Struggle Without the Right Platform")

    problems = [
        ("Disconnected Tools",
         "Projects live in spreadsheets, emails, and chat threads — no single source of truth."),
        ("No Real-Time Visibility",
         "Managers find out about delays after they happen, not before."),
        ("Manual Approval Bottlenecks",
         "Approval cycles are slow, informal, and leave no audit trail."),
        ("Resource Guesswork",
         "Allocating people to tasks is done by gut feel — not data."),
    ]

    ROW_H = 820000
    ROW_GAP = 50000
    start_y = CONTENT_TOP + 520000

    for i, (title, desc) in enumerate(problems):
        y = start_y + i * (ROW_H + ROW_GAP)
        # number circle bg
        rect(slide, MARGIN_L, y + 60000, 380000, 380000, C_IBLUE, None)
        txb(slide, f"0{i+1}", MARGIN_L, y + 60000, 380000, 380000,
            22, bold=True, color=C_BLUE, align=PP_ALIGN.CENTER)
        # title + desc
        txb(slide, title, MARGIN_L + 460000, y, CONTENT_W - 460000, 280000,
            14, bold=True, color=C_DBLUE)
        txb(slide, desc, MARGIN_L + 460000, y + 270000, CONTENT_W - 460000, 300000,
            12, color=C_MUTED)
        # divider (except last)
        if i < len(problems) - 1:
            line_shape(slide, MARGIN_L + 460000, y + ROW_H - 20000,
                       CONTENT_W - 460000, C_LINE, 9000)
    return slide

def slide_who(prs):
    slide = add_slide(prs)
    section_header(slide, "Who It's For", "Built for Teams Across Every Industry")

    industries = [
        ("IT & Software", "Agile sprints, release planning, dev team tracking"),
        ("Construction & EPC", "Site management, subcontractor coordination, milestones"),
        ("Manufacturing", "Production planning, shift scheduling, quality gates"),
        ("Professional Services", "Client projects, billable hours, deliverable tracking"),
        ("Healthcare", "Compliance workflows, staff scheduling, project delivery"),
        ("Financial Services", "Regulatory projects, audit trails, cross-team coordination"),
    ]

    COL_W = (CONTENT_W - 160000) // 2
    COL2_L = MARGIN_L + COL_W + 160000
    ITEM_H = 640000
    start_y = CONTENT_TOP + 520000

    for i, (name, desc) in enumerate(industries):
        col = i % 2
        row = i // 2
        lx = MARGIN_L if col == 0 else COL2_L
        ly = start_y + row * ITEM_H

        rect(slide, lx, ly + 80000, 50000, 280000, C_BLUE)   # left accent bar
        txb(slide, name, lx + 110000, ly + 60000, COL_W - 120000, 230000,
            13, bold=True, color=C_DBLUE)
        txb(slide, desc, lx + 110000, ly + 280000, COL_W - 120000, 250000,
            11, color=C_MUTED)
        if row < 2:
            line_shape(slide, lx, ly + ITEM_H - 10000, COL_W, C_LINE, 9000)

    return slide

def slide_feature(prs, section_label, title, bullets, outcome):
    slide = add_slide(prs)
    section_header(slide, section_label, title)

    # Left column — bullets
    LEFT_W  = 6200000
    RIGHT_L = MARGIN_L + LEFT_W + 280000
    RIGHT_W = CONTENT_W - LEFT_W - 280000
    bullet_y = CONTENT_TOP + 560000
    BULLET_H = (CONTENT_BOT - bullet_y - 100000) // len(bullets)

    for i, b in enumerate(bullets):
        by = bullet_y + i * BULLET_H
        rect(slide, MARGIN_L, by + 90000, 36000, 200000, C_BLUE)  # tick bar
        txb(slide, b, MARGIN_L + 90000, by, LEFT_W - 90000, BULLET_H - 40000,
            13, color=C_BODY)

    # Right panel — outcome
    rect(slide, RIGHT_L, CONTENT_TOP + 460000, RIGHT_W,
         CONTENT_BOT - CONTENT_TOP - 500000, C_CARD, C_BORDER, 12700)
    # teal top accent
    rect(slide, RIGHT_L, CONTENT_TOP + 460000, RIGHT_W, 60000, C_TEAL)
    txb(slide, "OUTCOME", RIGHT_L + 80000, CONTENT_TOP + 580000, RIGHT_W - 160000,
        220000, 9, bold=True, color=C_TEAL)
    line_shape(slide, RIGHT_L + 80000, CONTENT_TOP + 790000, RIGHT_W - 160000,
               C_LINE, 9000)
    txb(slide, outcome, RIGHT_L + 80000, CONTENT_TOP + 860000, RIGHT_W - 160000,
        CONTENT_BOT - CONTENT_TOP - 1000000, 13, color=C_BODY)
    return slide

def slide_ai(prs):
    slide = add_slide(prs)
    section_header(slide, "AI & Intelligence", "Smart Features Powered by AI")

    rows = [
        (C_IBLUE,  "Smart Scheduling",
         "AI-suggested timelines based on team capacity and historical performance. "
         "No more guessing — the platform proposes realistic schedules automatically."),
        (C_ITEAL,  "Risk Detection",
         "Automatically flags at-risk tasks and milestones before they cause delays. "
         "Early warnings give teams time to course-correct before it's too late."),
        (C_IBLUE,  "Workload Balancing",
         "Identifies over-allocated and under-utilized team members and recommends "
         "reallocation to keep every project moving at the right pace."),
    ]

    ROW_H = 980000
    ROW_GAP = 80000
    ICON_W  = 600000
    start_y = CONTENT_TOP + 520000

    for i, (icon_bg, title, desc) in enumerate(rows):
        ry = start_y + i * (ROW_H + ROW_GAP)
        rect(slide, MARGIN_L, ry, ICON_W, ICON_W - 60000, icon_bg)
        txb(slide, "✦", MARGIN_L, ry, ICON_W, ICON_W - 60000, 26,
            bold=True, color=C_BLUE, align=PP_ALIGN.CENTER)
        txb(slide, title, MARGIN_L + ICON_W + 120000, ry, CONTENT_W - ICON_W - 120000,
            280000, 15, bold=True, color=C_DBLUE)
        txb(slide, desc, MARGIN_L + ICON_W + 120000, ry + 270000,
            CONTENT_W - ICON_W - 120000, 500000, 12, color=C_MUTED)
        if i < len(rows) - 1:
            line_shape(slide, MARGIN_L, ry + ROW_H - 10000, CONTENT_W, C_LINE, 9000)

    return slide

def slide_why(prs):
    slide = add_slide(prs)
    section_header(slide, "Why Different", "What Sets This Platform Apart")

    points = [
        ("Single Platform",
         "One tool for planning, execution, tracking, and reporting — no integrations needed, no data silos."),
        ("Role-Aware Views",
         "Every user sees exactly what they need: tasks for contributors, dashboards for managers, reports for leaders."),
        ("Industry-Agnostic",
         "Pre-configured for IT, construction, manufacturing, healthcare, and more — ready to use on day one."),
        ("AI-Native",
         "Intelligence is built into every workflow — scheduling, risk detection, and workload balancing included."),
    ]

    COL_W  = (CONTENT_W - 200000) // 2
    COL2_L = MARGIN_L + COL_W + 200000
    ITEM_H = 1150000
    start_y = CONTENT_TOP + 520000

    for i, (title, desc) in enumerate(points):
        col = i % 2; row = i // 2
        lx = MARGIN_L if col == 0 else COL2_L
        ly = start_y + row * ITEM_H
        rect(slide, lx, ly, COL_W, ITEM_H - 80000, C_CARD, C_BORDER, 12700)
        rect(slide, lx, ly, COL_W, 50000, C_BLUE)
        txb(slide, title, lx + 80000, ly + 100000, COL_W - 160000, 280000,
            14, bold=True, color=C_DBLUE)
        txb(slide, desc, lx + 80000, ly + 370000, COL_W - 160000, 580000,
            12, color=C_MUTED)

    return slide

def slide_outcomes(prs):
    slide = add_slide(prs)
    section_header(slide, "Business Outcomes", "The Impact You Can Expect")

    sections = [
        ("Operational", C_BLUE, [
            "40% reduction in project delays",
            "3× faster planning cycles",
            "60% less time on status reporting",
            "Full resource visibility across all teams",
        ]),
        ("Strategic", C_TEAL, [
            "Faster time-to-market on every initiative",
            "Higher project success and on-time delivery",
            "Reduced operational risk and missed deadlines",
            "Scales from 10 to 10,000+ users without friction",
        ]),
    ]

    PANEL_W = (CONTENT_W - 150000) // 2
    PANEL_H = CONTENT_BOT - CONTENT_TOP - 520000
    start_y = CONTENT_TOP + 480000

    for i, (label, color, bullets) in enumerate(sections):
        lx = MARGIN_L + i * (PANEL_W + 150000)
        rect(slide, lx, start_y, PANEL_W, PANEL_H, C_CARD, C_BORDER, 12700)
        rect(slide, lx, start_y, PANEL_W, 70000, color)
        txb(slide, label.upper(), lx + 80000, start_y + 110000, PANEL_W - 160000,
            260000, 14, bold=True, color=C_DBLUE)
        line_shape(slide, lx + 80000, start_y + 360000, PANEL_W - 160000, C_LINE, 9000)
        B_H = (PANEL_H - 450000) // len(bullets)
        for j, b in enumerate(bullets):
            by = start_y + 430000 + j * B_H
            rect(slide, lx + 80000, by + 90000, 30000, 160000, color)
            txb(slide, b, lx + 160000, by, PANEL_W - 240000, B_H - 20000,
                12, color=C_BODY)

    return slide

def slide_vision(prs):
    slide = add_slide(prs)
    section_header(slide, "Our Vision", "")

    quote = ('"A world where every team has the clarity, tools, and intelligence '
             'to deliver — on time, every time."')
    txb(slide, quote, MARGIN_L + 400000, CONTENT_TOP + 500000,
        CONTENT_W - 800000, 1600000, 22, italic=True, color=C_DBLUE,
        align=PP_ALIGN.CENTER)
    line_shape(slide, SW // 2 - 1200000, CONTENT_TOP + 2250000, 2400000,
               C_BLUE, 18000)
    txb(slide, "— Inventia Product Vision", MARGIN_L, CONTENT_TOP + 2380000,
        CONTENT_W, 300000, 12, color=C_MUTED, align=PP_ALIGN.CENTER)
    return slide

def slide_thankyou(prs):
    slide = add_slide(prs, 2)   # Thank-you layout
    # The layout already has a background; just add text in safe zone
    txb(slide, "Let's Build Better Together",
        1500000, 2000000, 9192000, 700000, 32, bold=True, color=C_WHITE,
        align=PP_ALIGN.CENTER)
    line_shape(slide, SW//2 - 2000000, 2800000, 4000000, C_BLUE, 18000)
    txb(slide, "www.inventia.in  ·  info@inventia.in",
        1500000, 2920000, 9192000, 350000, 14, color=C_WHITE,
        align=PP_ALIGN.CENTER)
    return slide

# ── Main ─────────────────────────────────────────────────────────────────────
prs = Presentation(TEMPLATE)

# Remove the 3 template slides
for _ in range(len(prs.slides)):
    del_slide(prs, 0)

# Build slides
slide_title(prs)
slide_overview(prs)
slide_problem(prs)
slide_who(prs)

slide_feature(prs,
    "Project Planning",
    "Structured Project Planning from Day One",
    [
        "Hierarchical work breakdown structure (WBS) with unlimited nesting",
        "Baseline vs. actual tracking with automatic variance flagging",
        "Milestone and dependency management across teams",
        "Real-time schedule updates visible to all stakeholders",
    ],
    "Teams complete projects 30% faster with clear ownership and structured planning built in from day one."
)

slide_feature(prs,
    "Personal Productivity",
    "Every Team Member Knows Exactly What to Do",
    [
        "Personal task dashboard with prioritised daily work list",
        "Weekly planning view with capacity awareness",
        "Progress tracking at the individual contributor level",
        "Seamless visibility for managers — no chasing for updates",
    ],
    "Individual contributors spend less time in meetings and more time executing — with full clarity on priorities."
)

slide_feature(prs,
    "Management Dashboard",
    "Real-Time View Across All Projects and Teams",
    [
        "Portfolio-level project health status at a glance",
        "Resource utilisation heatmaps across all active projects",
        "Budget vs. actual tracking with drill-down to task level",
        "Configurable KPI widgets for any reporting need",
    ],
    "Managers make faster, better decisions with live data — not weekend status reports."
)

slide_ai(prs)

slide_feature(prs,
    "Approvals & Governance",
    "Compliant, Auditable Approval Workflows",
    [
        "Multi-level approval chains tailored to your process",
        "Auto-escalation when SLA thresholds are breached",
        "Full audit trail for every approval action and decision",
        "Role-based access control with granular permissions",
    ],
    "Governance without the bottleneck — structured approvals that move at the speed of business."
)

slide_why(prs)
slide_outcomes(prs)
slide_vision(prs)
slide_thankyou(prs)

prs.save(OUTPUT)
print(f"Saved: {OUTPUT}")
print(f"Total slides: {len(prs.slides)}")
