# ATM Kiosk UI Demo - Hardware Loadset Architecture

This repository contains a functional, production-ready frontend demonstration of a financial kiosk loadset. It is designed to simulate the strict environmental constraints of embedded systems (such as Windows 10 IoT) commonly used in ATM terminals, bridging the gap between web UI and physical hardware integration.

## Purpose of the Project
Building an interface for an ATM is fundamentally different from building a standard website. This project demonstrates how to structure code that handles physical bezel keys, strictly enforces hardware boundaries, manages transaction state locks, and provides universal accessibility (ADA compliance) for visually impaired users.

## Architectural Structure

### 1. HTML Structure (The Skeleton)
The HTML files represent individual terminal screens (e.g., Main Menu, Withdrawal). 
* **Zoned Layouts:** Every screen is separated into distinct sections (Header, Main Content, Footer) to ensure the layout remains predictable for users relying on screen readers.
* **ADA Compliance:** Visual text inside buttons is hidden from screen readers using `aria-hidden="true"`, ensuring the software only reads the carefully curated `aria-label` tags without duplicating spoken text.

### 2. CSS Architecture (The Boundaries)
* **Strict Hardware Confinement:** The primary `.atm-screen` class operates as a rigid 1024x768 physical bezel. The `overflow: hidden` property guarantees that dynamically generated content cannot bleed off the physical screen.
* **Base + Modifier Pattern:** Shared button styling is handled by a global CSS file, while screen-specific tweaks (like shrinking buttons to fit 4 options on a single screen) are handled locally via modifier classes, keeping the codebase extremely lightweight.

### 3. Global JavaScript (The Hardware Translator)
The `global.js` file acts as the nervous system of the kiosk. It is completely decoupled from the banking logic and solely handles the terminal's infrastructure:
* **Dynamic Hardware Scanning:** Instead of relying on a static list of buttons, the script scans the DOM on every keystroke to find only currently visible, enabled buttons. This ensures the physical arrow keys perfectly map to the visual state of the screen.
* **Event Normalization:** It captures physical keypad interactions (`ArrowDown`, `Enter`, `Escape`) and translates them into standard web "clicks", passing the interaction safely to the business logic layer.
* **Security Timeout:** A persistent timer runs in the background, automatically locking the screen to protect a user's session if they walk away from the terminal.

### 4. Local JavaScript (The Business Logic)
Files like `withdraws.js` act as the "brain" for specific transactions, executing the core banking rules:
* **State Management (Hardware Locks):** The exact millisecond a transaction begins, the UI disables all buttons on the screen. This "Hardware Lock" prevents a user from double-clicking or queuing up multiple financial requests while the system communicates with the backend switch.
* **Hardware Validation (Modulo Math):** Custom withdrawal requests are sanitized via `parseFloat` (to prevent decimal exploits) and validated using modulo arithmetic (`amount % 20 === 0`) to guarantee the software never commands the mechanical cassettes to dispense denominations they do not hold.
* **Dynamic Overlays:** Error handling (like Insufficient Funds) is managed via dynamic DOM manipulation rather than hardcoded HTML, allowing a single reusable overlay to serve multiple transaction outcomes.