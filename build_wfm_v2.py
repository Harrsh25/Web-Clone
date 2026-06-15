from pptx import Presentation
from pptx.util import Emu, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.oxml.ns import qn

TEMPLATE_PATH = "/root/.claude/uploads/b5947347-19f1-59d7-8db3-07624bf3b17b/74b734a8-Inventia_Template_V1.0_2.pptx"
OUTPUT_PATH = "/home/user/Web-Clone/WFM_Platform_v2.pptx"

# Colors
BLUE = RGBColor(0x00, 0x70, 0xC0)
TEAL = RGBColor(0x12, 0xA8, 0xBC)
BODY = RGBColor(0x1C, 0x2A, 0x38)
MUTED = RGBColor(0x5E, 0x6E, 0x7C)
LIGHT_BG = RGBColor(0xF4, 0xF7, 0xFA)
DIVIDER = RGBColor(0xE2, 0xE9, 0xEF)
SEC_NUM_BG = RGBColor(0xE8, 0xF0, 0xF8)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)

prs = Presentation(TEMPLATE_PATH)

def del_slide(prs, idx):
    sldIdLst = prs.slides._sldIdLst
    sId = sldIdLst[idx]
    rId = sId.get(qn('r:id'))
    sldIdLst.remove(sId)
    prs.part.drop_rel(rId)

for _ in range(len(prs.slides)):
    del_slide(prs, 0)

def add_slide():
    return prs.slides.add_slide(prs.slide_layouts[1])

def add_rect(slide, l, t, w, h, fill_color, no_border=True):
    shape = slide.shapes.add_shape(1, Emu(l), Emu(t), Emu(w), Emu(h))
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill_color
    if no_border:
        shape.line.fill.background()
    return shape

def add_oval(slide, l, t, w, h, fill_color, no_border=True):
    shape = slide.shapes.add_shape(9, Emu(l), Emu(t), Emu(w), Emu(h))
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill_color
    if no_border:
        shape.line.fill.background()
    return shape

def add_textbox(slide, l, t, w, h, text, size, color, bold=False, italic=False, align=None, word_wrap=True):
    txBox = slide.shapes.add_textbox(Emu(l), Emu(t), Emu(w), Emu(h))
    tf = txBox.text_frame
    tf.word_wrap = word_wrap
    para = tf.paragraphs[0]
    para.space_before = Pt(6)
    para.space_after = Pt(6)
    if align:
        para.alignment = align
    run = para.add_run()
    run.text = text
    run.font.size = size
    run.font.color.rgb = color
    run.font.bold = bold
    run.font.italic = italic
    return txBox

def add_top_bar(slide):
    add_rect(slide, 0, 0, 12192000, 50800, BLUE)

def add_divider(slide, t, l=640080, w=10912000):
    add_rect(slide, l, t, w, 12700, DIVIDER)

def add_section_header(slide, label, number):
    add_textbox(slide, 640080, 100000, 5000000, 200000, label, Pt(11), BLUE)
    add_textbox(slide, 640080, 200000, 800000, 600000, number, Pt(60), SEC_NUM_BG, bold=True)

def add_bullets(slide, l, t, w, bullets, size=Pt(13), color=None, space_before=Pt(8)):
    if color is None:
        color = BODY
    txBox = slide.shapes.add_textbox(Emu(l), Emu(t), Emu(w), Emu(2000000))
    tf = txBox.text_frame
    tf.word_wrap = True
    first = True
    for bullet in bullets:
        if first:
            para = tf.paragraphs[0]
            first = False
        else:
            para = tf.add_paragraph()
        para.space_before = space_before
        para.space_after = Pt(6)
        run = para.add_run()
        run.text = bullet
        run.font.size = size
        run.font.color.rgb = color
    return txBox

# ── Slide 1: Title ──────────────────────────────────────────────────────────
slide1 = add_slide()
add_rect(slide1, 0, 0, 76200, 6858000, BLUE)
add_textbox(slide1, 609600, 1800000, 9000000, 800000, "Workforce Management Platform", Pt(44), BODY, bold=True)
add_textbox(slide1, 609600, 2700000, 9000000, 400000, "Plan Smarter. Execute Faster. Deliver More.", Pt(20), BLUE)
add_rect(slide1, 609600, 3300000, 5000000, 12700, BLUE)
add_textbox(slide1, 609600, 3500000, 3000000, 300000, "Inventia", Pt(14), MUTED)
add_textbox(slide1, 9500000, 6200000, 2000000, 200000, "v1.0 | 2025", Pt(11), MUTED, align=PP_ALIGN.RIGHT)

# ── Slide 2: Platform Overview ───────────────────────────────────────────────
slide2 = add_slide()
add_top_bar(slide2)
add_textbox(slide2, 640080, 200000, 8000000, 400000, "PLATFORM OVERVIEW", Pt(11), BLUE)
# Stat boxes
add_textbox(slide2, 640080, 900000, 3000000, 800000, "3x Faster", Pt(48), BLUE, bold=True)
add_textbox(slide2, 640080, 1600000, 3000000, 300000, "Planning", Pt(14), MUTED)
add_textbox(slide2, 4500000, 900000, 3000000, 800000, "40%", Pt(48), BLUE, bold=True)
add_textbox(slide2, 4500000, 1600000, 3000000, 300000, "Less Admin", Pt(14), MUTED)
add_textbox(slide2, 8200000, 900000, 3000000, 800000, "Real-Time", Pt(48), BLUE, bold=True)
add_textbox(slide2, 8200000, 1600000, 3000000, 300000, "Visibility", Pt(14), MUTED)
add_divider(slide2, 2200000)
add_textbox(slide2, 640080, 2400000, 10912000, 600000,
    "The Workforce Management Platform gives every team member, manager, and executive the clarity and control they need — from individual task planning to portfolio-level visibility.",
    Pt(14), BODY)

# ── Slide 3: The Problem ─────────────────────────────────────────────────────
slide3 = add_slide()
add_top_bar(slide3)
add_section_header(slide3, "THE PROBLEM", "03")
add_textbox(slide3, 640080, 700000, 10000000, 400000, "Why Teams Struggle to Deliver", Pt(28), BODY, bold=True)

pain_points = [
    (1400000, "01", "Projects run on spreadsheets and disconnected tools, causing version chaos"),
    (2200000, "02", "Managers lack real-time visibility into who is doing what and when"),
    (3000000, "03", "Approval cycles are manual, slow, and create bottlenecks"),
    (3800000, "04", "No single source of truth for project health, resources, or timelines"),
]
for y, num, desc in pain_points:
    add_textbox(slide3, 640080, y, 600000, 500000, num, Pt(32), BLUE, bold=True)
    add_textbox(slide3, 1400000, y, 9800000, 500000, desc, Pt(14), BODY)

for dy in [2000000, 2800000, 3600000]:
    add_divider(slide3, dy)

# ── Slide 4: Who It's For ────────────────────────────────────────────────────
slide4 = add_slide()
add_top_bar(slide4)
add_section_header(slide4, "WHO IT'S FOR", "04")
add_textbox(slide4, 640080, 700000, 10000000, 400000, "Built for Every Industry", Pt(28), BODY, bold=True)

left_industries = [
    ("IT & Software", "Sprint planning, release tracking, and resource management"),
    ("Manufacturing", "Production scheduling, shift planning, and capacity management"),
    ("Healthcare", "Staff scheduling, compliance tracking, and project governance"),
]
right_industries = [
    ("Construction & EPC", "WBS planning, milestone tracking, and subcontractor management"),
    ("Professional Services", "Client project delivery, utilization tracking, and billing"),
    ("Financial Services", "Regulatory project tracking, audit trails, and risk management"),
]
row_ys = [1500000, 2600000, 3700000]

for i, (name, desc) in enumerate(left_industries):
    y = row_ys[i]
    add_textbox(slide4, 640080, y, 5000000, 300000, name, Pt(16), BODY, bold=True)
    add_textbox(slide4, 640080, y + 280000, 5000000, 300000, desc, Pt(12), MUTED)

for i, (name, desc) in enumerate(right_industries):
    y = row_ys[i]
    add_textbox(slide4, 6200000, y, 5000000, 300000, name, Pt(16), BODY, bold=True)
    add_textbox(slide4, 6200000, y + 280000, 5000000, 300000, desc, Pt(12), MUTED)

for dy in [2400000, 3500000]:
    add_rect(slide4, 640080, dy, 5000000, 12700, DIVIDER)
    add_rect(slide4, 6200000, dy, 5000000, 12700, DIVIDER)

# ── Slide 5: Project Planning ────────────────────────────────────────────────
slide5 = add_slide()
add_top_bar(slide5)
add_section_header(slide5, "PROJECT PLANNING", "05")
add_textbox(slide5, 640080, 700000, 6800000, 600000, "Structured Project Planning from Day One", Pt(26), BODY, bold=True)
add_bullets(slide5, 640080, 1500000, 6800000, [
    "• Hierarchical WBS with unlimited nesting",
    "• Baseline vs. actual tracking",
    "• Milestone and dependency management",
    "• Real-time schedule updates",
])
# Outcome box
add_rect(slide5, 7800000, 1200000, 3800000, 3800000, LIGHT_BG)
add_rect(slide5, 7800000, 1200000, 50800, 3800000, TEAL)
add_textbox(slide5, 7900000, 1280000, 3600000, 200000, "OUTCOME", Pt(10), TEAL, bold=True)
add_textbox(slide5, 7900000, 1450000, 3600000, 3400000,
    "Teams complete projects 30% faster with clear ownership and structured planning built in from day one.",
    Pt(13), BODY)

# ── Slide 6: Personal Productivity ──────────────────────────────────────────
slide6 = add_slide()
add_top_bar(slide6)
add_section_header(slide6, "PERSONAL PRODUCTIVITY", "06")
add_textbox(slide6, 640080, 700000, 6800000, 600000, "Every Team Member Knows What to Do", Pt(26), BODY, bold=True)
add_bullets(slide6, 640080, 1500000, 6800000, [
    "• Personal task dashboard with priorities",
    "• Daily and weekly work planning",
    "• Progress tracking by individual",
    "• Seamless manager visibility",
])
add_rect(slide6, 7800000, 1200000, 3800000, 3800000, LIGHT_BG)
add_rect(slide6, 7800000, 1200000, 50800, 3800000, TEAL)
add_textbox(slide6, 7900000, 1280000, 3600000, 200000, "OUTCOME", Pt(10), TEAL, bold=True)
add_textbox(slide6, 7900000, 1450000, 3600000, 3400000,
    "Individual contributors spend less time in meetings and more time executing — with full clarity on priorities.",
    Pt(13), BODY)

# ── Slide 7: Management Dashboard ───────────────────────────────────────────
slide7 = add_slide()
add_top_bar(slide7)
add_section_header(slide7, "MANAGEMENT DASHBOARD", "07")
add_textbox(slide7, 640080, 700000, 6800000, 600000, "Real-Time View Across All Projects", Pt(26), BODY, bold=True)
add_bullets(slide7, 640080, 1500000, 6800000, [
    "• Portfolio-level project health at a glance",
    "• Resource utilization heatmaps",
    "• Budget vs. actual tracking",
    "• One-click drill-down to task level",
])
add_rect(slide7, 7800000, 1200000, 3800000, 3800000, LIGHT_BG)
add_rect(slide7, 7800000, 1200000, 50800, 3800000, TEAL)
add_textbox(slide7, 7900000, 1280000, 3600000, 200000, "OUTCOME", Pt(10), TEAL, bold=True)
add_textbox(slide7, 7900000, 1450000, 3600000, 3400000,
    "Managers make faster, better decisions with live data instead of waiting for status reports.",
    Pt(13), BODY)

# ── Slide 8: AI & Intelligence ───────────────────────────────────────────────
slide8 = add_slide()
add_top_bar(slide8)
add_section_header(slide8, "AI & INTELLIGENCE", "08")
add_textbox(slide8, 640080, 700000, 10000000, 400000, "Intelligence Built Into Every Workflow", Pt(28), BODY, bold=True)

ai_rows = [
    (1600000, "Smart Scheduling", "AI-suggested timelines based on team capacity and past performance"),
    (2700000, "Risk Detection", "Automatically flags at-risk tasks before they cause delays"),
    (3800000, "Workload Balancing", "Recommends reallocation when team members are over or under-utilized"),
]
for y, title, desc in ai_rows:
    add_oval(slide8, 640080, y, 457200, 457200, SEC_NUM_BG)
    add_textbox(slide8, 1200000, y, 9000000, 300000, title, Pt(16), BODY, bold=True)
    add_textbox(slide8, 1200000, y + 300000, 9000000, 300000, desc, Pt(13), MUTED)

for dy in [2500000, 3600000]:
    add_divider(slide8, dy)

# ── Slide 9: Approvals & Governance ─────────────────────────────────────────
slide9 = add_slide()
add_top_bar(slide9)
add_section_header(slide9, "APPROVALS & GOVERNANCE", "09")
add_textbox(slide9, 640080, 700000, 6800000, 600000, "Compliant, Auditable Approval Workflows", Pt(26), BODY, bold=True)
add_bullets(slide9, 640080, 1500000, 6800000, [
    "• Multi-level approval chains",
    "• Auto-escalation on SLA breach",
    "• Full audit trail for every action",
    "• Role-based access and visibility",
])
add_rect(slide9, 7800000, 1200000, 3800000, 3800000, LIGHT_BG)
add_rect(slide9, 7800000, 1200000, 50800, 3800000, TEAL)
add_textbox(slide9, 7900000, 1280000, 3600000, 200000, "OUTCOME", Pt(10), TEAL, bold=True)
add_textbox(slide9, 7900000, 1450000, 3600000, 3400000,
    "Governance without the bottleneck — structured approvals that move at the speed of business.",
    Pt(13), BODY)

# ── Slide 10: Why Different ──────────────────────────────────────────────────
slide10 = add_slide()
add_top_bar(slide10)
add_section_header(slide10, "WHY DIFFERENT", "10")
add_textbox(slide10, 640080, 700000, 10000000, 400000, "What Sets Us Apart", Pt(28), BODY, bold=True)

diff_rows = [
    (1500000, "Single Platform", "One tool for planning, execution, tracking, and reporting — no integrations needed"),
    (2400000, "Role-Aware", "Every user sees exactly what they need: tasks, dashboards, or reports"),
    (3300000, "Industry-Agnostic", "Pre-configured for IT, construction, manufacturing, and more"),
    (4200000, "AI-Native", "Intelligence built into workflows, not bolted on"),
]
for y, label, desc in diff_rows:
    add_textbox(slide10, 640080, y, 2500000, 400000, label, Pt(16), BLUE, bold=True)
    add_textbox(slide10, 3200000, y, 8350000, 400000, desc, Pt(14), BODY)

for dy in [2200000, 3100000, 4000000]:
    add_divider(slide10, dy)

# ── Slide 11: Business Outcomes ──────────────────────────────────────────────
slide11 = add_slide()
add_top_bar(slide11)
add_section_header(slide11, "BUSINESS OUTCOMES", "11")
add_textbox(slide11, 640080, 700000, 10000000, 400000, "Measurable Impact at Every Level", Pt(28), BODY, bold=True)
# Vertical divider
add_rect(slide11, 6000000, 1300000, 12700, 4000000, DIVIDER)
# Left col
add_textbox(slide11, 640080, 1300000, 5100000, 250000, "OPERATIONAL", Pt(12), BLUE, bold=True)
add_bullets(slide11, 640080, 1600000, 5100000, [
    "• 40% reduction in project delays",
    "• 3x faster planning cycles",
    "• 60% less time on status reporting",
    "• Full resource visibility across teams",
])
# Right col
add_textbox(slide11, 6200000, 1300000, 5500000, 250000, "STRATEGIC", Pt(12), BLUE, bold=True)
add_bullets(slide11, 6200000, 1600000, 5500000, [
    "• Faster time-to-market",
    "• Higher project success rate",
    "• Reduced operational risk",
    "• Scalable across 10 to 10,000 users",
])

# ── Slide 12: Vision ─────────────────────────────────────────────────────────
slide12 = add_slide()
add_rect(slide12, 0, 0, 12192000, 6858000, LIGHT_BG)
add_top_bar(slide12)
add_textbox(slide12, 1000000, 1800000, 10192000, 2000000,
    '"A world where every team has the clarity, tools, and intelligence to deliver — on time, every time."',
    Pt(28), BODY, italic=True, align=PP_ALIGN.CENTER)
add_rect(slide12, 4500000, 3900000, 3192000, 12700, BLUE)
add_textbox(slide12, 1000000, 4100000, 10192000, 300000, "— Inventia Product Vision", Pt(14), MUTED, align=PP_ALIGN.CENTER)

# ── Slide 13: Thank You ──────────────────────────────────────────────────────
slide13 = add_slide()
add_rect(slide13, 0, 0, 76200, 6858000, BLUE)
add_textbox(slide13, 609600, 2000000, 10000000, 600000, "Let's Build Better Together", Pt(40), BODY, bold=True)
add_rect(slide13, 609600, 2800000, 5000000, 12700, BLUE)
add_textbox(slide13, 609600, 3100000, 8000000, 300000, "www.inventia.com | contact@inventia.com", Pt(16), BLUE)
add_textbox(slide13, 609600, 3600000, 3000000, 300000, "Inventia", Pt(14), MUTED)

prs.save(OUTPUT_PATH)
print(f"Done: {len(prs.slides)} slides")
