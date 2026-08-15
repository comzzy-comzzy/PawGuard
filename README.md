# PawGuard — Protect Dogs, They Have Feelings Too

PawGuard is a community platform dedicated to preventing dog abuse, abandonment, neglect, and unnecessary harm. It provides a real-time reporting system for dogs in danger, tracks rescue operations, lists verified adoptions, reunites lost pets with their owners, and educates the public on humane animal care.

---

## Overview of Platform Capabilities

### 1. Hero Interface & Interactive Illustrations
- Clean responsive layout matching the design specifications.
- Animated character illustrations (Teddy and Oliver) with smooth continuous breathing, blinking, ear movement, and tail animations.
- Quick action routing to emergency reporting and support desks.

### 2. Cruelty & Danger Reporting System
- Incident classification: Physical Abuse, Continuous Chaining, Starvation/Neglect, Abandonment, Dog Fighting, and Road Trauma.
- Urgency level triage: Critical Danger, High Urgency, and In Progress.
- Automatic GPS coordinate resolution and street address capture.
- Secure photo and video evidence upload with timestamp tracking.
- Anonymous reporting toggle to protect witness identity.
- Automated dispatch simulation generating official Case IDs and notifying regional volunteers.

### 3. Real-Time Rescue Radar & Mission Tracking
- Interactive incident board with status pipeline: Reported, Responder En Route, Under Vet Care, and Safe & Sheltered.
- One-click volunteer assignment allowing community responders to accept active rescue dispatches.
- Integrated GPS routing and case sharing.

### 4. Adoption & Foster Management
- Profiles for rescued dogs featuring health certifications, vaccination status, and temperament details.
- Size and compatibility filters (good with children, dogs, or single-pet homes).
- Multi-step adoption application form with meet-and-greet scheduling.
- Virtual sponsorship program for ongoing medical and nutrition support.

### 5. Lost, Found & Injured Animals Noticeboard
- Public noticeboard for missing pets, found dogs, and injured strays.
- Automated flyer generator producing printable missing pet posters with contact information.

### 6. Humane Education & Legal Guide
- Canine body language decoder highlighting subtle distress and pain signals.
- Legal overview of animal cruelty laws, tethering regulations, and evidence documentation standards.
- Emergency first-aid guidance for heatstroke, toxin exposure, and trauma care.
- Knowledge evaluation assessment with scoring and explanations.

### 7. Volunteer Network & Community Coordination
- Dedicated volunteer roles: Rescue Transport Drivers, Foster Sanctuaries, Field Spotters, and Veterinary Assistants.
- Community update feed for verified rescue stories and alerts.
- Regional volunteer enrollment system.

### 8. Emergency Medical Fund
- Transparent progress tracker for veterinary surgical interventions and medical equipment.
- Direct funding tiers for emergency food kits, vaccination protocols, and trauma surgeries.

### 9. 24/7 Emergency Dispatch Hotline
- Direct access to round-the-clock emergency numbers, poison control centers, and rapid SOS broadcasts.

---

## Technology Stack

- Frontend Framework: React 18 with TypeScript
- Build Tool: Vite 6
- Styling: Tailwind CSS and custom CSS keyframe animations
- Icons: Lucide React
- Audio Synthesis: Web Audio API (native browser oscillators)

---

## Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/comzzy-comzzy/PawGuard.git
   cd PawGuard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.

---

## Production Build & Deployment

To generate an optimized production bundle:

```bash
npm run build
```

The output files will be created in the `dist` directory.

### Deploying on Vercel

1. Import the repository on [Vercel](https://vercel.com).
2. Framework Preset: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Click **Deploy**.

---

## License

This project is open-source and intended for animal welfare advocacy.
