from pptx import Presentation
from pptx.util import Emu, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.oxml.ns import qn
from pptx.enum.shapes import MSO_SHAPE_TYPE

TEMPLATE_PATH = "/root/.claude/uploads/b5947347-19f1-59d7-8db3-07624bf3b17b/74b734a8-Inventia_Template_V1.0_2.pptx"
OUTPUT_PATH = "/home/user/Web-Clone/WFM_Platform_v2.pptx"

# Colors
C_BLUE = RGBColor(0x00, 0x70, 0xC0)
C_TEAL = RGBColor(0x12, 0xA8, 0xBC)
C_BODY = RGBColor(0x1C, 0x2A, 0x38)
C_MUTED = RGBColor(0x5E, 0x6E, 0x7C)
C_LIGHTBG = RGBColor(0xF4, 0xF7, 0xFA)
C_DIVIDER = RGBColor(0xE2, 0xE9, 0xEF)
C_SECNUM = RGBColor(0xE8, 0xF0, 0xF8)
C_WHITE = RGBColor(0xFF, 0xFF, 0xFF)

prs = Presentation(TEMPLATE_PATH)

# Delete all existing slides
def del_slide(prs, idx):
    sldIdLst = prs.slides._sldIdLst
    sId = sldIdLst[idx]
    rId = sId.get(qn('r:id'))
    sldIdLst.remove(sId)
    prs.part.drop_rel(rId)

for _ in range(len(prs.slides)):
    del_slide(prs, 0)

BLANK = prs.slide_layouts[1]

def add_slide():
    return prs.slides.add_slide(BLANK)

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

def add_textbox(slide, l, t, w, h):
    return slide.shapes.add_textbox(Emu(l), Emu(t), Emu(w), Emu(h))

def set_text(tf, text, size, color, bold=False, italic=False, align=None, space_before=None, space_after=None, word_wrap=True):
    tf.word_wrap = word_wrap
    para = tf.paragraphs[0]
    if align:
        para.alignment = align
    if space_before is not None:
        para.space_before = Pt(space_before)
    if space_after is not None:
        para.space_after = Pt(space_after)
    run = para.add_run()
    run.text = text
    run.font.size = size
    run.font.color.rgb = color
    run.font.bold = bold
    run.font.italic = italic

def add_para(tf, text, size, color, bold=False, italic=False, align=None, space_before=6, space_after=6):
    para = tf.add_paragraph()
    if align:
        para.alignment = align
    para.space_before = Pt(space_before)
    para.space_after = Pt(space_after)
    run = para.add_run()
    run.text = text
    run.font.size = size
    run.font.color.rgb = color
    run.font.bold = bold
    run.font.italic = italic

def top_bar(slide):
    add_rect(slide, 0, 0, 12192000, 50800, C_BLUE)

def divider(slide, t, l=640080, w=10912000):
    add_rect(slide, l, t, w, 12700, C_DIVIDER)

def section_header(slide, label, number):
    # Large faded number
    tb = add_textbox(slide, 640080, 200000, 3000000, 700000)
    tf = tb.text_frame
    tf.word_wrap = False
    para = tf.paragraphs[0]
    run = para.add_run()
    run.text = number
    run.font.size = Pt(60)
    run.font.bold = True
    run.font.color.rgb = C_SECNUM
    # Section label on top
    tb2 = add_textbox(slide, 640080, 100000, 4000000, 200000)
    tf2 = tb2.text_frame
    tf2.word_wrap = False
    para2 = tf2.paragraphs[0]
    run2 = para2.add_run()
    run2.text = label
    run2.font.size = Pt(11)
    run2.font.color.rgb = C_BLUE
    run2.font.bold = False

# ─── SLIDE 1 - Title ───────────────────────────────────────────────────────────
s1 = add_slide()
# Left vertical blue bar
add_rect(s1, 0, 0, 76200, 6858000, C_BLUE)
# Product name
tb = add_textbox(s1, 609600, 1800000, 9000000, 800000)
set_text(tb.text_frame, "Workforce Management Platform", Pt(44), C_BODY, bold=True)
# Tagline
tb = add_textbox(s1, 609600, 2700000, 9000000, 400000)
set_text(tb.text_frame, "Plan Smarter. Execute Faster. Deliver More.", Pt(20), C_BLUE)
# Horizontal divider
add_rect(s1, 609600, 3300000, 5000000, 12700, C_BLUE)
# Company
tb = add_textbox(s1, 609600, 3500000, 3000000, 300000)
set_text(tb.text_frame, "Inventia", Pt(14), C_MUTED)
# Version
tb = add_textbox(s1, 9500000, 6200000, 2000000, 200000)
set_text(tb.text_frame, "v1.0 | 2025", Pt(11), C_MUTED, align=PP_ALIGN.RIGHT)

# ─── SLIDE 2 - Platform Overview ───────────────────────────────────────────────
s2 = add_slide()
top_bar(s2)
# Title
tb = add_textbox(s2, 640080, 200000, 8000000, 400000)
set_text(tb.text_frame, "PLATFORM OVERVIEW", Pt(11), C_BLUE)
# Stat 1
tb = add_textbox(s2, 640080, 900000, 2500000, 800000)
set_text(tb.text_frame, "3x Faster", Pt(48), C_BLUE, bold=True)
tb = add_textbox(s2, 640080, 1600000, 2500000, 300000)
set_text(tb.text_frame, "Planning", Pt(14), C_MUTED)
# Stat 2
tb = add_textbox(s2, 4500000, 900000, 2500000, 800000)
set_text(tb.text_frame, "40%", Pt(48), C_BLUE, bold=True)
tb = add_textbox(s2, 4500000, 1600000, 2500000, 300000)
set_text(tb.text_frame, "Less Admin", Pt(14), C_MUTED)
# Stat 3
tb = add_textbox(s2, 8200000, 900000, 2500000, 800000)
set_text(tb.text_frame, "Real-Time", Pt(48), C_BLUE, bold=True)
tb = add_textbox(s2, 8200000, 1600000, 2500000, 300000)
set_text(tb.text_frame, "Visibility", Pt(14), C_MUTED)
# Divider
divider(s2, 2200000)
# Paragraph
tb = add_textbox(s2, 640080, 2400000, 10912000, 600000)
set_text(tb.text_frame, "The Workforce Management Platform gives every team member, manager, and executive the clarity and control they need — from individual task planning to portfolio-level visibility.", Pt(14), C_BODY)

# ─── SLIDE 3 - The Problem ──────────────────────────────────────────────────────
s3 = add_slide()
top_bar(s3)
section_header(s3, "THE PROBLEM", "03")
# Title
tb = add_textbox(s3, 640080, 700000, 10000000, 400000)
set_text(tb.text_frame, "Why Teams Struggle to Deliver", Pt(28), C_BODY, bold=True)

pain_points = [
    (1400000, "01", "Projects run on spreadsheets and disconnected tools, causing version chaos"),
    (2200000, "02", "Managers lack real-time visibility into who is doing what and when"),
    (3000000, "03", "Approval cycles are manual, slow, and create bottlenecks"),
    (3800000, "04", "No single source of truth for project health, resources, or timelines"),
]
for y, num, desc in pain_points:
    tb = add_textbox(s3, 640080, y, 600000, 400000)
    set_text(tb.text_frame, num, Pt(32), C_BLUE, bold=True)
    tb = add_textbox(s3, 1400000, y, 9800000, 400000)
    set_text(tb.text_frame, desc, Pt(14), C_BODY)

for dy in [2000000, 2800000, 3600000]:
    divider(s3, dy)

# ─── SLIDE 4 - Who It's For ─────────────────────────────────────────────────────
s4 = add_slide()
top_bar(s4)
section_header(s4, "WHO IT'S FOR", "04")
tb = add_textbox(s4, 640080, 700000, 10000000, 400000)
set_text(tb.text_frame, "Built for Every Industry", Pt(28), C_BODY, bold=True)

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
    tb = add_textbox(s4, 640080, y, 5000000, 300000)
    set_text(tb.text_frame, name, Pt(16), C_BODY, bold=True)
    tb = add_textbox(s4, 640080, y + 280000, 5000000, 300000)
    set_text(tb.text_frame, desc, Pt(12), C_MUTED)

for i, (name, desc) in enumerate(right_industries):
    y = row_ys[i]
    tb = add_textbox(s4, 6200000, y, 5000000, 300000)
    set_text(tb.text_frame, name, Pt(16), C_BODY, bold=True)
    tb = add_textbox(s4, 6200000, y + 280000, 5000000, 300000)
    set_text(tb.text_frame, desc, Pt(12), C_MUTED)

for dy in [2400000, 3500000]:
    divider(s4, dy, l=640080, w=5000000)
    divider(s4, dy, l=6200000, w=5000000)

# ─── SLIDE 5 - Project Planning ─────────────────────────────────────────────────
s5 = add_slide()
top_bar(s5)
section_header(s5, "PROJECT PLANNING", "05")
tb = add_textbox(s5, 640080, 700000, 6800000, 600000)
set_text(tb.text_frame, "Structured Project Planning from Day One", Pt(26), C_BODY, bold=True)

bullets5 = [
    "• Hierarchical WBS with unlimited nesting",
    "• Baseline vs. actual tracking",
    "• Milestone and dependency management",
    "• Real-time schedule updates",
]
tb = add_textbox(s5, 640080, 1500000, 6800000, 2000000)
tf = tb.text_frame
tf.word_wrap = True
set_text(tf, bullets5[0], Pt(13), C_BODY, space_before=8, space_after=6)
for b in bullets5[1:]:
    add_para(tf, b, Pt(13), C_BODY, space_before=8, space_after=6)

# Outcome box
add_rect(s5, 7800000, 1200000, 3800000, 3800000, C_LIGHTBG)
add_rect(s5, 7800000, 1200000, 50800, 3800000, C_TEAL)
tb = add_textbox(s5, 7900000, 1280000, 3600000, 200000)
set_text(tb.text_frame, "OUTCOME", Pt(10), C_TEAL, bold=True)
tb = add_textbox(s5, 7900000, 1450000, 3600000, 2000000)
set_text(tb.text_frame, "Teams complete projects 30% faster with clear ownership and structured planning built in from day one.", Pt(13), C_BODY)

# ─── SLIDE 6 - Personal Productivity ───────────────────────────────────────────
s6 = add_slide()
top_bar(s6)
section_header(s6, "PERSONAL PRODUCTIVITY", "06")
tb = add_textbox(s6, 640080, 700000, 6800000, 600000)
set_text(tb.text_frame, "Every Team Member Knows What to Do", Pt(26), C_BODY, bold=True)

bullets6 = [
    "• Personal task dashboard with priorities",
    "• Daily and weekly work planning",
    "• Progress tracking by individual",
    "• Seamless manager visibility",
]
tb = add_textbox(s6, 640080, 1500000, 6800000, 2000000)
tf = tb.text_frame
tf.word_wrap = True
set_text(tf, bullets6[0], Pt(13), C_BODY, space_before=8, space_after=6)
for b in bullets6[1:]:
    add_para(tf, b, Pt(13), C_BODY, space_before=8, space_after=6)

add_rect(s6, 7800000, 1200000, 3800000, 3800000, C_LIGHTBG)
add_rect(s6, 7800000, 1200000, 50800, 3800000, C_TEAL)
tb = add_textbox(s6, 7900000, 1280000, 3600000, 200000)
set_text(tb.text_frame, "OUTCOME", Pt(10), C_TEAL, bold=True)
tb = add_textbox(s6, 7900000, 1450000, 3600000, 2000000)
set_text(tb.text_frame, "Individual contributors spend less time in meetings and more time executing — with full clarity on priorities.", Pt(13), C_BODY)

# ─── SLIDE 7 - Management Dashboard ────────────────────────────────────────────
s7 = add_slide()
top_bar(s7)
section_header(s7, "MANAGEMENT DASHBOARD", "07")
tb = add_textbox(s7, 640080, 700000, 6800000, 600000)
set_text(tb.text_frame, "Real-Time View Across All Projects", Pt(26), C_BODY, bold=True)

bullets7 = [
    "• Portfolio-level project health at a glance",
    "• Resource utilization heatmaps",
    "• Budget vs. actual tracking",
    "• One-click drill-down to task level",
]
tb = add_textbox(s7, 640080, 1500000, 6800000, 2000000)
tf = tb.text_frame
tf.word_wrap = True
set_text(tf, bullets7[0], Pt(13), C_BODY, space_before=8, space_after=6)
for b in bullets7[1:]:
    add_para(tf, b, Pt(13), C_BODY, space_before=8, space_after=6)

add_rect(s7, 7800000, 1200000, 3800000, 3800000, C_LIGHTBG)
add_rect(s7, 7800000, 1200000, 50800, 3800000, C_TEAL)
tb = add_textbox(s7, 7900000, 1280000, 3600000, 200000)
set_text(tb.text_frame, "OUTCOME", Pt(10), C_TEAL, bold=True)
tb = add_textbox(s7, 7900000, 1450000, 3600000, 2000000)
set_text(tb.text_frame, "Managers make faster, better decisions with live data instead of waiting for status reports.", Pt(13), C_BODY)

# ─── SLIDE 8 - AI & Intelligence ────────────────────────────────────────────────
s8 = add_slide()
top_bar(s8)
section_header(s8, "AI & INTELLIGENCE", "08")
tb = add_textbox(s8, 640080, 700000, 10000000, 400000)
set_text(tb.text_frame, "Intelligence Built Into Every Workflow", Pt(28), C_BODY, bold=True)

ai_rows = [
    (1600000, "Smart Scheduling", "AI-suggested timelines based on team capacity and past performance"),
    (2700000, "Risk Detection", "Automatically flags at-risk tasks before they cause delays"),
    (3800000, "Workload Balancing", "Recommends reallocation when team members are over or under-utilized"),
]
for y, title, desc in ai_rows:
    add_oval(s8, 640080, y, 457200, 457200, C_SECNUM)
    tb = add_textbox(s8, 1200000, y, 10000000, 300000)
    set_text(tb.text_frame, title, Pt(16), C_BODY, bold=True)
    tb = add_textbox(s8, 1200000, y + 300000, 10000000, 300000)
    set_text(tb.text_frame, desc, Pt(13), C_MUTED)

for dy in [2500000, 3600000]:
    divider(s8, dy)

# ─── SLIDE 9 - Approvals & Governance ──────────────────────────────────────────
s9 = add_slide()
top_bar(s9)
section_header(s9, "APPROVALS & GOVERNANCE", "09")
tb = add_textbox(s9, 640080, 700000, 6800000, 600000)
set_text(tb.text_frame, "Compliant, Auditable Approval Workflows", Pt(26), C_BODY, bold=True)

bullets9 = [
    "• Multi-level approval chains",
    "• Auto-escalation on SLA breach",
    "• Full audit trail for every action",
    "• Role-based access and visibility",
]
tb = add_textbox(s9, 640080, 1500000, 6800000, 2000000)
tf = tb.text_frame
tf.word_wrap = True
set_text(tf, bullets9[0], Pt(13), C_BODY, space_before=8, space_after=6)
for b in bullets9[1:]:
    add_para(tf, b, Pt(13), C_BODY, space_before=8, space_after=6)

add_rect(s9, 7800000, 1200000, 3800000, 3800000, C_LIGHTBG)
add_rect(s9, 7800000, 1200000, 50800, 3800000, C_TEAL)
tb = add_textbox(s9, 7900000, 1280000, 3600000, 200000)
set_text(tb.text_frame, "OUTCOME", Pt(10), C_TEAL, bold=True)
tb = add_textbox(s9, 7900000, 1450000, 3600000, 2000000)
set_text(tb.text_frame, "Governance without the bottleneck — structured approvals that move at the speed of business.", Pt(13), C_BODY)

# ─── SLIDE 10 - Why Different ───────────────────────────────────────────────────
s10 = add_slide()
top_bar(s10)
section_header(s10, "WHY DIFFERENT", "10")
tb = add_textbox(s10, 640080, 700000, 10000000, 400000)
set_text(tb.text_frame, "What Sets Us Apart", Pt(28), C_BODY, bold=True)

differentiators = [
    (1500000, "Single Platform", "One tool for planning, execution, tracking, and reporting — no integrations needed"),
    (2400000, "Role-Aware", "Every user sees exactly what they need: tasks, dashboards, or reports"),
    (3300000, "Industry-Agnostic", "Pre-configured for IT, construction, manufacturing, and more"),
    (4200000, "AI-Native", "Intelligence built into workflows, not bolted on"),
]
for y, label, desc in differentiators:
    tb = add_textbox(s10, 640080, y, 2500000, 400000)
    set_text(tb.text_frame, label, Pt(16), C_BLUE, bold=True)
    tb = add_textbox(s10, 3200000, y, 8350000, 400000)
    set_text(tb.text_frame, desc, Pt(14), C_BODY)

for dy in [2200000, 3100000, 4000000]:
    divider(s10, dy)

# ─── SLIDE 11 - Business Outcomes ──────────────────────────────────────────────
s11 = add_slide()
top_bar(s11)
section_header(s11, "BUSINESS OUTCOMES", "11")
tb = add_textbox(s11, 640080, 700000, 10000000, 400000)
set_text(tb.text_frame, "Measurable Impact at Every Level", Pt(28), C_BODY, bold=True)

# Vertical divider
add_rect(s11, 6000000, 1300000, 12700, 4000000, C_DIVIDER)

# Left column
tb = add_textbox(s11, 640080, 1300000, 5100000, 300000)
set_text(tb.text_frame, "OPERATIONAL", Pt(12), C_BLUE, bold=True)
left_bullets = [
    "• 40% reduction in project delays",
    "• 3x faster planning cycles",
    "• 60% less time on status reporting",
    "• Full resource visibility across teams",
]
tb = add_textbox(s11, 640080, 1600000, 5100000, 2500000)
tf = tb.text_frame
tf.word_wrap = True
set_text(tf, left_bullets[0], Pt(13), C_BODY, space_before=6, space_after=6)
for b in left_bullets[1:]:
    add_para(tf, b, Pt(13), C_BODY, space_before=6, space_after=6)

# Right column
tb = add_textbox(s11, 6200000, 1300000, 5500000, 300000)
set_text(tb.text_frame, "STRATEGIC", Pt(12), C_BLUE, bold=True)
right_bullets = [
    "• Faster time-to-market",
    "• Higher project success rate",
    "• Reduced operational risk",
    "• Scalable across 10 to 10,000 users",
]
tb = add_textbox(s11, 6200000, 1600000, 5500000, 2500000)
tf = tb.text_frame
tf.word_wrap = True
set_text(tf, right_bullets[0], Pt(13), C_BODY, space_before=6, space_after=6)
for b in right_bullets[1:]:
    add_para(tf, b, Pt(13), C_BODY, space_before=6, space_after=6)

# ─── SLIDE 12 - Vision ──────────────────────────────────────────────────────────
s12 = add_slide()
# Light background
add_rect(s12, 0, 0, 12192000, 6858000, C_LIGHTBG)
top_bar(s12)
# Quote
tb = add_textbox(s12, 1000000, 1800000, 10192000, 2000000)
set_text(tb.text_frame, '"A world where every team has the clarity, tools, and intelligence to deliver — on time, every time."', Pt(28), C_BODY, italic=True, align=PP_ALIGN.CENTER)
# Blue underline
add_rect(s12, 4500000, 3900000, 3192000, 12700, C_BLUE)
# Attribution
tb = add_textbox(s12, 1000000, 4100000, 10192000, 300000)
set_text(tb.text_frame, "— Inventia Product Vision", Pt(14), C_MUTED, align=PP_ALIGN.CENTER)

# ─── SLIDE 13 - Thank You ───────────────────────────────────────────────────────
s13 = add_slide()
# Left vertical blue bar
add_rect(s13, 0, 0, 76200, 6858000, C_BLUE)
# Heading
tb = add_textbox(s13, 609600, 2000000, 10000000, 600000)
set_text(tb.text_frame, "Let's Build Better Together", Pt(40), C_BODY, bold=True)
# Divider
add_rect(s13, 609600, 2800000, 5000000, 12700, C_BLUE)
# Contact
tb = add_textbox(s13, 609600, 3100000, 8000000, 300000)
set_text(tb.text_frame, "www.inventia.com | contact@inventia.com", Pt(16), C_BLUE)
# Company
tb = add_textbox(s13, 609600, 3600000, 3000000, 300000)
set_text(tb.text_frame, "Inventia", Pt(14), C_MUTED)

prs.save(OUTPUT_PATH)
print(f"Done: {len(prs.slides)} slides")
