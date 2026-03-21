const VERBA_KNOWLEDGE = {
  syntax: [
    { topic: "Core Syntax", keywords: ["syntax", "grammar", "period", "colon", "end", "statement", "block"], description: "Verba uses English-like statements. Regular lines end with `.` and block openers end with `:`. Blocks close with `end.`.", example: "say \"Hello\".\nif score > 5:\n    say \"Ready\".\nend." },
    { topic: "Comments & Notes", keywords: ["comment", "comments", "note", "docstring", "documentation"], description: "Single-line comments use `/-` or `#`. Block comments use `/-- ... --/`. `note` is parse-time documentation, and the first note in a function or class becomes its help docstring.", example: "note Greets a user.\ndefine greet needing name:\n    say \"Hello, {name}!\".\nend." },
    { topic: "Variables & Strings", keywords: ["variable", "variables", "assignment", "string", "boolean", "null", "interpolation"], description: "Variables are dynamic. Double-quoted strings support `{value}` interpolation, while single-quoted strings stay raw.", example: "name = \"Alice\".\nis_admin = true.\nraw = 'No {interpolation}'.\nsay \"Hello, {name}!\"." },
    { topic: "Input, Output & Files", keywords: ["say", "display", "print", "ask", "input", "save file", "load file", "append file", "delete file"], description: "Use `say` or `display` for output, `ask` for input, and built-in statements for file save/load/append/delete operations.", example: "ask the user \"Name?\" and save to name.\nsay \"Hi, {name}!\".\nsave \"hello\" to file called \"out.txt\"." },
    { topic: "Conditions & Logic", keywords: ["if", "else", "otherwise", "unless", "condition", "logic", "comparison"], description: "Verba supports `if`, `else if`, `otherwise`, and `unless`, plus aliases like `is`, `is not`, `is greater than`, and `in`.", example: "if score >= 90:\n    say \"A\".\notherwise:\n    say \"Keep trying\".\nend." },
    { topic: "Loops", keywords: ["loop", "loops", "while", "repeat", "for", "range", "step", "stop", "skip"], description: "Use `while`, `repeat N times`, `for item in list`, and `for i from X to Y step Z`. `stop` breaks and `skip` continues.", example: "repeat 3 times with i:\n    say i.\nend.\nfor item in items:\n    say item.\nend." },
    { topic: "Collections", keywords: ["list", "lists", "map", "maps", "dictionary", "array", "comprehension", "slice", "sort"], description: "Lists are 1-indexed and maps use JSON-like literals. Verba also supports list and map comprehensions.", example: "nums = a list of 1, 2, 3.\nadd 4 to nums.\nuser = {\"name\": \"Alice\"}.\nsquares = x * 2 for x in nums." },
    { topic: "Functions", keywords: ["function", "functions", "define", "run", "give", "return", "default parameter", "keyword argument"], description: "Functions use `define ... needing ...:` and return with `give`. Calls can use `run` or `the result of running ...`.", example: "define square needing n:\n    give n * n.\nend.\nresult = the result of running square with 5." },
    { topic: "Generators", keywords: ["generator", "yield", "lazy", "stream"], description: "Functions using `yield` become generators that can be looped over.", example: "define count_up needing limit:\n    yield 1.\nend." },
    { topic: "Classes, Objects & Enums", keywords: ["class", "classes", "oop", "object", "objects", "extends", "self", "new", "enum"], description: "Verba supports classes, inheritance with `extends`, constructors with `init`, instances created with `new`, and enums for named constants.", example: "class Dog:\n    define init needing name:\n        self.name = name.\n    end.\nend.\ndog = new Dog with \"Rex\"." },
    { topic: "Pattern Matching", keywords: ["match", "when", "pattern", "destructure", "switch"], description: "Use `match` and `when` for value-based control flow and simple destructuring.", example: "match point:\n    when [0, 0]:\n        say \"Origin\".\nend." },
    { topic: "Pointers & Memory", keywords: ["pointer", "reference", "references", "deref", "memory", "free", "delete variable"], description: "References use `&name`, dereferencing uses `deref ptr`, and variables can be removed from scope with `free` or `delete`.", example: "x = 42.\nptr = &x.\nderef ptr = 100.\nfree ptr." },
    { topic: "Error Handling", keywords: ["try", "on error", "finally", "raise", "error", "exception"], description: "Verba supports `try`, `on error`, and `finally`, plus explicit errors via `raise`.", example: "try:\n    raise \"Oops\".\non error saving to err:\n    say err.\nend." },
    { topic: "Async & Await", keywords: ["async", "await", "task", "background", "concurrency"], description: "Async functions use `async define`, run with `async run`, and resolve with `await result = task`.", example: "async define fetch_data as follows:\n    give \"done\".\nend.\ntask = async run fetch_data.\nawait result = task." },
    { topic: "Modules, Help & Testing", keywords: ["import", "module", "modules", "help", "test", "assert", "with statement", "decorator"], description: "Verba supports `.vrb` imports, inline help, built-in tests with `test` and `assert`, `with` blocks for scoped resources, and decorators such as `@log` and `@time`.", example: "import from file called \"my_module.vrb\" as mh.\nhelp strings.\ntest \"math works\":\n    assert 1 == 1.\nend." }
  ],
  stdlib: {
    strings: [
      { func: "strings.length", desc: "Return the character count of a string." },
      { func: "strings.upper", desc: "Convert text to uppercase." },
      { func: "strings.lower", desc: "Convert text to lowercase." },
      { func: "strings.contains", desc: "Check whether a substring exists." },
      { func: "strings.starts_with", desc: "Check whether text starts with a prefix." },
      { func: "strings.ends_with", desc: "Check whether text ends with a suffix." },
      { func: "strings.trim", desc: "Trim leading and trailing whitespace." },
      { func: "strings.replace", desc: "Replace all matching substrings." },
      { func: "strings.split", desc: "Split text into a list." },
      { func: "strings.index_of", desc: "Return the first index of a substring, or -1." },
      { func: "strings.slice", desc: "Extract text by start and end indexes." },
      { func: "strings.to_number", desc: "Parse text as a number." },
      { func: "strings.repeat", desc: "Repeat a string a number of times." }
    ],
    math: [
      { func: "math.floor", desc: "Round a number down." },
      { func: "math.ceil", desc: "Round a number up." },
      { func: "math.round", desc: "Round a number with optional digits." },
      { func: "math.abs", desc: "Absolute value." },
      { func: "math.sqrt", desc: "Square root." },
      { func: "math.power", desc: "Raise a base to an exponent." },
      { func: "math.log", desc: "Logarithm, natural by default or custom base." },
      { func: "math.sin", desc: "Sine of a radian value." },
      { func: "math.cos", desc: "Cosine of a radian value." },
      { func: "math.tan", desc: "Tangent of a radian value." },
      { func: "math.random", desc: "Random float between 0 and 1." },
      { func: "math.random_int", desc: "Random integer in a range." },
      { func: "math.min", desc: "Smaller of two values." },
      { func: "math.max", desc: "Larger of two values." },
      { func: "math.pi", desc: "Pi constant." }
    ],
    json: [
      { func: "json.parse", desc: "Parse JSON text into a Verba value." },
      { func: "json.get", desc: "Read a key from JSON text or an object." },
      { func: "json.set", desc: "Return updated JSON text with a changed key." },
      { func: "json.build", desc: "Build JSON from key-value pairs." },
      { func: "json.stringify", desc: "Serialize a value as JSON text." },
      { func: "json.has", desc: "Check whether a JSON key exists." },
      { func: "json.keys", desc: "Return all keys from a JSON object." },
      { func: "json.arr_len", desc: "Return JSON array length." },
      { func: "json.arr_item", desc: "Read an item from a JSON array by index." }
    ],
    http: [
      { func: "http.get", desc: "Perform an HTTP GET request." },
      { func: "http.post", desc: "Perform an HTTP POST request." },
      { func: "http.post_json", desc: "POST a JSON payload." },
      { func: "http.put", desc: "Perform an HTTP PUT request." },
      { func: "http.delete", desc: "Perform an HTTP DELETE request." },
      { func: "http.encode_form", desc: "Encode a JSON object as form data." },
      { func: "http.encode_url", desc: "Build a URL with query parameters." }
    ],
    browser: [
      { func: "browser.open", desc: "Open and fetch a page into browser state." },
      { func: "browser.goto", desc: "Alias for opening a URL." },
      { func: "browser.read", desc: "Read text from a selector." },
      { func: "browser.read_html", desc: "Read inner HTML from a selector." },
      { func: "browser.title", desc: "Return the current page title." },
      { func: "browser.url", desc: "Return the current page URL." },
      { func: "browser.screenshot", desc: "Save a page capture to a path." },
      { func: "browser.click", desc: "Click a selector when supported by the backend." },
      { func: "browser.type", desc: "Type into a selector when supported by the backend." },
      { func: "browser.wait", desc: "Pause for a number of milliseconds." },
      { func: "browser.wait_for", desc: "Wait for a selector to exist." },
      { func: "browser.eval", desc: "Evaluate page-side JavaScript when supported." },
      { func: "browser.close", desc: "Reset browser state." }
    ],
    express: [
      { func: "express.get", desc: "Register a GET route." },
      { func: "express.post", desc: "Register a POST route." },
      { func: "express.put", desc: "Register a PUT route." },
      { func: "express.delete", desc: "Register a DELETE route." },
      { func: "express.use", desc: "Mount a static directory under a prefix." },
      { func: "express.json_build", desc: "Build JSON for responses." },
      { func: "express.json_parse_key", desc: "Read a key from request JSON text." },
      { func: "express.listen", desc: "Start the Express-style server." }
    ],
    db: [
      { func: "db.open", desc: "Open a SQLite database." },
      { func: "conn.execute", desc: "Run write queries such as INSERT or UPDATE." },
      { func: "conn.query", desc: "Run SELECT queries and return rows." },
      { func: "conn.close", desc: "Close the database connection." }
    ],
    crypto: [
      { func: "crypto.hash", desc: "Hash text, SHA-256 by default." },
      { func: "crypto.generate_token", desc: "Generate a secure token." },
      { func: "crypto.encrypt", desc: "Encrypt text using the built-in scheme." },
      { func: "crypto.decrypt", desc: "Decrypt previously encrypted text." }
    ],
    csv: [
      { func: "csv.read", desc: "Read CSV rows into Verba objects." },
      { func: "csv.write", desc: "Write rows to a CSV file." }
    ],
    xml: [
      { func: "xml.parse", desc: "Parse XML text." },
      { func: "xml.find", desc: "Find a tag in parsed XML data." }
    ],
    os: [
      { func: "os.exists", desc: "Check whether a path exists." },
      { func: "os.is_file", desc: "Check whether a path is a file." },
      { func: "os.is_dir", desc: "Check whether a path is a directory." },
      { func: "os.list", desc: "List a directory." },
      { func: "os.mkdir", desc: "Create a directory." },
      { func: "os.remove", desc: "Delete a file or directory." },
      { func: "os.rename", desc: "Rename or move a path." },
      { func: "os.cwd", desc: "Return the current working directory." },
      { func: "os.join", desc: "Join two path segments." },
      { func: "os.basename", desc: "Return the last path segment." },
      { func: "os.dirname", desc: "Return the parent directory." },
      { func: "os.size", desc: "Return file size in bytes." }
    ],
    time: [
      { func: "time.now", desc: "Return the current Unix timestamp." },
      { func: "time.sleep", desc: "Sleep for milliseconds." },
      { func: "time.format", desc: "Format a timestamp with a pattern." },
      { func: "time.year", desc: "Current year." },
      { func: "time.month", desc: "Current month number." },
      { func: "time.day", desc: "Current day of month." },
      { func: "time.hour", desc: "Current hour." },
      { func: "time.minute", desc: "Current minute." },
      { func: "time.second", desc: "Current second." },
      { func: "time.since", desc: "Seconds elapsed since a timestamp." }
    ],
    datetime: [
      { func: "datetime.now", desc: "Return the current datetime, optionally formatted." },
      { func: "datetime.parse", desc: "Parse text using a layout." },
      { func: "datetime.format", desc: "Format an ISO datetime string." }
    ],
    random: [
      { func: "random.number", desc: "Random integer in a range." },
      { func: "random.choice", desc: "Pick one item from a list." },
      { func: "random.shuffle", desc: "Return a shuffled copy of a list." }
    ],
    regex: [
      { func: "regex.match", desc: "Match a pattern from the start of text." },
      { func: "regex.search", desc: "Search for a pattern anywhere in text." },
      { func: "regex.replace", desc: "Replace using a regular expression." }
    ],
    base64: [
      { func: "base64.encode", desc: "Base64 encode a string." },
      { func: "base64.decode", desc: "Base64 decode a string." }
    ],
    env: [
      { func: "env.get", desc: "Read an environment variable." },
      { func: "env.set", desc: "Set an environment variable." },
      { func: "env.has", desc: "Check whether an environment variable exists." },
      { func: "env.all", desc: "List all environment variables." }
    ],
    vibe: [
      { func: "vibe.open", desc: "Open a WebSocket connection." },
      { func: "conn.send", desc: "Send a WebSocket message." },
      { func: "conn.receive", desc: "Receive a WebSocket message." },
      { func: "conn.close", desc: "Close the WebSocket connection." }
    ],
    gui: [
      { func: "gui.alert", desc: "Show a simple desktop alert dialog." },
      { func: "gui.window", desc: "Create a desktop window." },
      { func: "win.button", desc: "Add a button with a callback." },
      { func: "win.label", desc: "Add a label to the window." },
      { func: "win.input", desc: "Add a labeled text input." },
      { func: "win.get", desc: "Read an input by label." },
      { func: "win.show", desc: "Start the GUI event loop." }
    ],
    canvas: [
      { func: "canvas.new", desc: "Create a drawing canvas window." },
      { func: "c.background", desc: "Set the canvas background color." },
      { func: "c.rect", desc: "Draw a rectangle." },
      { func: "c.circle", desc: "Draw a circle." },
      { func: "c.ellipse", desc: "Draw an ellipse." },
      { func: "c.line", desc: "Draw a line." },
      { func: "c.polygon", desc: "Draw a polygon." },
      { func: "c.arc", desc: "Draw an arc." },
      { func: "c.text", desc: "Draw text on the canvas." },
      { func: "c.image", desc: "Draw an image from a path." },
      { func: "c.move", desc: "Move an item by delta." },
      { func: "c.delete", desc: "Delete a specific item." },
      { func: "c.clear", desc: "Clear all canvas items." },
      { func: "c.on_click", desc: "Bind a click callback." },
      { func: "c.on_key", desc: "Bind a key callback." },
      { func: "c.on_motion", desc: "Bind a mouse motion callback." },
      { func: "c.loop", desc: "Run a render loop at a target FPS." },
      { func: "c.update", desc: "Flush pending draws." },
      { func: "c.save", desc: "Save the canvas to a file." },
      { func: "c.show", desc: "Open the canvas window." },
      { func: "c.close", desc: "Close the canvas window." }
    ]
  },
  packages: [
    { name: "string_box", desc: "Terminal formatting toolkit with boxes, tables, badges, bullets, and ANSI color helpers.", versions: ["1.0.0", "2.0.0"], functions: [
      { name: "draw_box", desc: "Draw a basic bordered box." },
      { name: "draw_box_styled", desc: "Draw a custom border box with padding." },
      { name: "draw_double_box", desc: "Draw a double-line Unicode box." },
      { name: "draw_rounded_box", desc: "Draw a rounded-corner Unicode box." },
      { name: "draw_heavy_box", desc: "Draw a heavy Unicode box." },
      { name: "banner", desc: "Print a large centered banner." },
      { name: "header", desc: "Print a section header." },
      { name: "subheader", desc: "Print a subsection header." },
      { name: "divider", desc: "Print a horizontal divider." },
      { name: "divider_labeled", desc: "Print a divider with centered text." },
      { name: "label", desc: "Print a key/value label pair." },
      { name: "label_colored", desc: "Print a colored key/value label pair." },
      { name: "badge", desc: "Print an inline colored badge." },
      { name: "color_text", desc: "Wrap text in an ANSI color." },
      { name: "bold_text", desc: "Wrap text in bold ANSI styling." },
      { name: "dim_text", desc: "Wrap text in dim ANSI styling." },
      { name: "success", desc: "Print a green success line." },
      { name: "warning", desc: "Print a yellow warning line." },
      { name: "error_msg", desc: "Print a red error line." },
      { name: "info", desc: "Print a cyan info line." },
      { name: "align_left", desc: "Left-align text to a width." },
      { name: "align_right", desc: "Right-align text to a width." },
      { name: "align_center", desc: "Center text to a width." },
      { name: "table_header", desc: "Print a 3-column table header." },
      { name: "table_row", desc: "Print a 3-column table row." },
      { name: "table_divider", desc: "Print a table divider." },
      { name: "table_footer", desc: "Print a table footer." },
      { name: "indent", desc: "Indent text by levels." },
      { name: "bullet", desc: "Print a bullet point." },
      { name: "numbered", desc: "Print a numbered item." },
      { name: "print_list", desc: "Print a list as bullet points." }
    ], install: "verba install string_box" },
    { name: "math_plus", desc: "Extended math package with factorials, primes, combinatorics, modular arithmetic, geometry, and trig approximations.", versions: ["1.0.0", "1.1.0", "1.2.0", "1.3.0", "1.4.0"], functions: [
      { name: "factorial", desc: "Recursive factorial." },
      { name: "is_prime", desc: "Prime-number test." },
      { name: "power", desc: "Raise base to exponent." },
      { name: "gcd", desc: "Greatest common divisor." },
      { name: "lcm", desc: "Least common multiple." },
      { name: "fibonacci", desc: "Nth Fibonacci number." },
      { name: "deg_to_rad", desc: "Convert degrees to radians." },
      { name: "rad_to_deg", desc: "Convert radians to degrees." },
      { name: "is_perfect", desc: "Check whether a number is perfect." },
      { name: "digits_sum", desc: "Sum the digits of a number." },
      { name: "is_palindrome", desc: "Check whether a number is a palindrome." },
      { name: "is_even", desc: "Check whether a number is even." },
      { name: "is_odd", desc: "Check whether a number is odd." },
      { name: "log2_approx", desc: "Approximate floor(log2(n))." },
      { name: "absolute", desc: "Absolute value." },
      { name: "min_of", desc: "Smaller of two values." },
      { name: "max_of", desc: "Larger of two values." },
      { name: "clamp", desc: "Clamp to a range." },
      { name: "sign", desc: "Return sign as -1, 0, or 1." },
      { name: "round_to", desc: "Round to a number of decimal places." },
      { name: "floor_of", desc: "Manual floor helper." },
      { name: "ceil_of", desc: "Manual ceiling helper." },
      { name: "lerp", desc: "Linear interpolation." },
      { name: "map_range", desc: "Map a value from one range to another." },
      { name: "permutations", desc: "nPr ordered arrangements." },
      { name: "combinations", desc: "nCr unordered selections." },
      { name: "mean", desc: "Arithmetic mean from total and count." },
      { name: "variance", desc: "Population variance helper." },
      { name: "std_dev", desc: "Population standard deviation." },
      { name: "is_coprime", desc: "Check whether two numbers are coprime." },
      { name: "mod_pow", desc: "Modular exponentiation." },
      { name: "mod_inv", desc: "Modular inverse for prime moduli." },
      { name: "euler_totient", desc: "Euler totient function." },
      { name: "bit_and", desc: "Bitwise AND." },
      { name: "bit_or", desc: "Bitwise OR." },
      { name: "bit_xor", desc: "Bitwise XOR." },
      { name: "left_shift", desc: "Left shift by powers of two." },
      { name: "right_shift", desc: "Right shift by powers of two." },
      { name: "count_bits", desc: "Count set bits." },
      { name: "hypotenuse", desc: "Hypotenuse length." },
      { name: "circle_area", desc: "Area of a circle." },
      { name: "circle_perimeter", desc: "Circumference of a circle." },
      { name: "rect_area", desc: "Rectangle area." },
      { name: "rect_perimeter", desc: "Rectangle perimeter." },
      { name: "triangle_area", desc: "Triangle area." },
      { name: "triangle_perimeter", desc: "Triangle perimeter." },
      { name: "sqrt_approx", desc: "Square root approximation." },
      { name: "sin_approx", desc: "Sine approximation in radians." },
      { name: "cos_approx", desc: "Cosine approximation in radians." },
      { name: "tan_approx", desc: "Tangent approximation in radians." },
      { name: "sin_deg", desc: "Sine approximation in degrees." },
      { name: "cos_deg", desc: "Cosine approximation in degrees." },
      { name: "tan_deg", desc: "Tangent approximation in degrees." }
    ], install: "verba install math_plus" },
    { name: "date_helper", desc: "Date formatting and simple date checks.", versions: ["1.0.0"], functions: [{ name: "get_full_date", desc: "Return a YYYY-M-D style date string." }, { name: "is_weekend", desc: "Simple weekend helper." }], install: "verba install date_helper" },
    { name: "test_pkg", desc: "Sample package in the Verba registry.", versions: ["1.0.0"], functions: [], install: "verba install test_pkg" }
  ],
  architecture: [
    { file: "verba.json", desc: "Project manifest storing metadata and dependencies." },
    { file: "verba-lock.json", desc: "Lock file with package versions, URLs, and sha256 integrity hashes." },
    { file: "registry.json", desc: "Registry index for published packages." },
    { dir: "modules/", desc: "Folder where installed `.vrb` packages are stored." },
    { dir: "examples/", desc: "Reference scripts for syntax, web, browser, pointers, GUI, and canvas usage." }
  ],
  cli: [
    { cmd: "verba run <file.vrb>", desc: "Run a Verba script." },
    { cmd: "verba check <file.vrb>", desc: "Parse a script without running it." },
    { cmd: "verba watch <file.vrb>", desc: "Watch a script and re-run on change." },
    { cmd: "verba repl", desc: "Open the interactive REPL." },
    { cmd: "verba format <file.vrb>", desc: "Auto-format a Verba file." },
    { cmd: "verba init <name>", desc: "Create a new Verba project." },
    { cmd: "verba install <pkg/url>", desc: "Install a package from the registry or a direct URL." },
    { cmd: "verba install", desc: "Install all dependencies from `verba.json`." },
    { cmd: "verba update <pkg>", desc: "Update a specific package." },
    { cmd: "verba update", desc: "Update all packages listed in `verba.json`." },
    { cmd: "verba remove <pkg>", desc: "Remove an installed package." },
    { cmd: "verba search <query>", desc: "Search the package registry." },
    { cmd: "verba list", desc: "List installed packages." },
    { cmd: "verba outdated", desc: "List packages with updates available." },
    { cmd: "verba sync", desc: "Sync modules using `verba-lock.json`." },
    { cmd: "verba --version", desc: "Print the CLI version." }
  ],
  examples: [
    { name: "examples/advanced.vrb", desc: "Classes, async work, fetch, file I/O, and free." },
    { name: "examples/canvas_ball.vrb", desc: "Canvas drawing and animation loop example." },
    { name: "examples/file_io.vrb", desc: "File save, load, append, and delete usage." },
    { name: "examples/full_example.vrb", desc: "Functions, loops, and user input." },
    { name: "examples/gui_task_manager.vrb", desc: "GUI example with controls and callbacks." },
    { name: "examples/http_server.vrb", desc: "Built-in route-based server example." },
    { name: "examples/lists_and_loops.vrb", desc: "Lists, add/remove, and looping." },
    { name: "examples/math_and_else.vrb", desc: "Arithmetic and conditions." },
    { name: "examples/my_module.vrb", desc: "Module import example." },
    { name: "examples/pattern_star.vrb", desc: "Pattern output example." },
    { name: "examples/pointers.vrb", desc: "References, dereferencing, null checks, and pointer mutation." },
    { name: "examples/scraper.vrb", desc: "Scraping-oriented example." },
    { name: "examples/secure_server.vrb", desc: "Secure server example." },
    { name: "examples/table.vrb", desc: "Table or multiplication-style output example." },
    { name: "examples/test_enum.vrb", desc: "Enum example." },
    { name: "examples/test_vibe.vrb", desc: "WebSocket example." },
    { name: "examples/use_browser.vrb", desc: "Browser module usage." },
    { name: "examples/use_express.vrb", desc: "Express-style routes, params, static files, and JSON responses." },
    { name: "examples/use_http.vrb", desc: "HTTP client usage." },
    { name: "examples/webapp/server.vrb", desc: "Full web app example." }
  ]
};

const QUERY_ALIASES = {
  oop: ["class", "classes", "inheritance", "object"],
  server: ["http server", "express", "route", "respond", "listen"],
  websocket: ["vibe", "ws", "web socket"],
  filesystem: ["os", "file", "directory", "path"],
  package: ["install", "update", "remove", "registry", "dependency", "modules"],
  testing: ["test", "assert"],
  docs: ["help", "note", "docstring"],
  async: ["await", "task", "background"],
  pointer: ["reference", "deref", "memory"]
};

function normalizeQuery(text) {
  return text.toLowerCase().replace(/[^\w.\-/ ]+/g, " ").replace(/\s+/g, " ").trim();
}

function has(query, value) {
  const term = value.toLowerCase().trim();
  if (!term) return false;
  if (term.includes(" ") || term.includes(".") || term.includes("_") || term.includes("-") || term.includes("/")) {
    return query.includes(term);
  }
  const tokens = query.split(/\s+/).filter(Boolean);
  const singular = term.endsWith("s") ? term.slice(0, -1) : term;
  return tokens.includes(term) || tokens.includes(`${term}s`) || tokens.includes(singular);
}

function hasAny(query, values) {
  return values.some((v) => has(query, v));
}

function tokenizeQuery(query) {
  return query.split(/\s+/).filter(Boolean);
}

function functionName(entry) {
  return typeof entry === "string" ? entry : entry.func;
}

function functionDesc(entry) {
  return typeof entry === "string" ? "" : entry.desc || "";
}

function packageFunctionName(entry) {
  return typeof entry === "string" ? entry : entry.name;
}

function packageFunctionDesc(entry) {
  return typeof entry === "string" ? "" : entry.desc || "";
}

function expandQuery(query) {
  const parts = [query];
  Object.entries(QUERY_ALIASES).forEach(([key, aliases]) => {
    if (has(query, key) || hasAny(query, aliases)) parts.push(key, ...aliases);
  });
  return parts.join(" ");
}

function findBestMatch(userQuery) {
  const normalizedQuery = normalizeQuery(userQuery);
  const exactPackage = VERBA_KNOWLEDGE.packages.find((pkg) => normalizedQuery === pkg.name.toLowerCase());
  if (exactPackage) {
    return [{ type: "package", ...exactPackage }];
  }

  const query = expandQuery(normalizeQuery(userQuery));
  const queryTokens = tokenizeQuery(query);
  const hits = [];

  if (hasAny(query, ["standard library", "stdlib", "all modules", "built in modules", "built-in modules"])) {
    Object.entries(VERBA_KNOWLEDGE.stdlib).forEach(([name, funcs]) => hits.push({ type: "stdlib_mod", name, funcs }));
  }

  VERBA_KNOWLEDGE.syntax.forEach((item) => {
    const topicTokens = tokenizeQuery(item.topic.toLowerCase());
    const topicMatches = topicTokens.length > 1
      ? topicTokens.every((token) => queryTokens.includes(token))
      : has(query, item.topic.toLowerCase());
    if (topicMatches || hasAny(query, item.keywords)) hits.push({ type: "syntax", ...item });
  });

  Object.entries(VERBA_KNOWLEDGE.stdlib).forEach(([mod, funcs]) => {
    if (has(query, mod) || has(query, `${mod} module`)) hits.push({ type: "stdlib_mod", name: mod, funcs });
    funcs.forEach((func) => {
      const fullName = functionName(func);
      const shortName = fullName.split(".").pop();
      if (has(query, fullName) || has(query, shortName)) hits.push({ type: "stdlib_func", name: mod, func: fullName, desc: functionDesc(func) });
    });
  });

  VERBA_KNOWLEDGE.packages.forEach((pkg) => {
    if (has(query, pkg.name) || hasAny(query, pkg.functions.map(packageFunctionName))) hits.push({ type: "package", ...pkg });
    pkg.functions.forEach((func) => {
      const funcName = packageFunctionName(func);
      if (has(query, funcName)) hits.push({ type: "package_func", pkg: pkg.name, func: funcName, desc: packageFunctionDesc(func) });
    });
  });

  VERBA_KNOWLEDGE.cli.forEach((item) => {
    const parts = item.cmd.toLowerCase().split(" ").map((p) => p.replace(/[<>]/g, ""));
    if (parts.some((p) => p && p !== "verba" && has(query, p))) hits.push({ type: "cli", ...item });
  });

  VERBA_KNOWLEDGE.architecture.forEach((item) => {
    const subject = (item.file || item.dir || "").toLowerCase();
    if (subject && has(query, subject)) hits.push({ type: "architecture", ...item });
    else if (hasAny(query, ["architecture", "manifest", "lockfile", "lock file", "registry", "modules folder"])) hits.push({ type: "architecture", ...item });
  });

  VERBA_KNOWLEDGE.examples.forEach((item) => {
    const name = item.name.toLowerCase();
    const base = name.split("/").pop();
    const baseTokens = base.replace(".vrb", "").split(/[_-]/).filter(Boolean);
    if (has(query, "example") || has(query, name) || has(query, base) || baseTokens.some((token) => token.length > 3 && queryTokens.includes(token))) {
      hits.push({ type: "example", ...item });
    }
  });

  const seen = new Set();
  return hits.filter((hit) => {
    const id = JSON.stringify(hit);
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

function summarizeHitTypes(hits) {
  const labels = [];
  if (hits.some((h) => h.type === "syntax")) labels.push("Language");
  if (hits.some((h) => h.type === "stdlib_mod" || h.type === "stdlib_func")) labels.push("Stdlib");
  if (hits.some((h) => h.type === "package" || h.type === "package_func")) labels.push("Packages");
  if (hits.some((h) => h.type === "cli")) labels.push("CLI");
  if (hits.some((h) => h.type === "architecture")) labels.push("Project");
  if (hits.some((h) => h.type === "example")) labels.push("Examples");
  return labels;
}

function buildFollowups(hits, query) {
  const suggestions = [];

  hits.forEach((hit) => {
    if (hit.type === "package") {
      suggestions.push(`How do I install ${hit.name}?`);
      if (hit.functions.length > 0) suggestions.push(`${hit.name} functions`);
    }
    if (hit.type === "stdlib_mod") {
      suggestions.push(`${hit.name} examples`);
      suggestions.push(`${hit.name} functions`);
    }
    if (hit.type === "syntax") {
      suggestions.push(`${hit.topic} examples`);
    }
    if (hit.type === "cli") {
      suggestions.push("package manager commands");
    }
  });

  if (query.toLowerCase().includes("async")) suggestions.push("async example");
  if (query.toLowerCase().includes("class")) suggestions.push("class example");
  if (query.toLowerCase().includes("http")) suggestions.push("http example");
  if (query.toLowerCase().includes("express")) suggestions.push("express example");

  return [...new Set(suggestions)].filter((item) => item.toLowerCase() !== query.toLowerCase()).slice(0, 4);
}

function formatResponse(hits, query) {
  if (hits.length === 0) {
    return "I couldn’t map that phrasing to the local Verba docs yet. Try asking about **syntax, classes, async, pointers, HTTP/Express, packages, CLI commands, standard library modules, or examples**.";
  }

  const hitLabels = summarizeHitTypes(hits);
  const followups = buildFollowups(hits, query);
  let out = `### Documentation Results for "${query}"\n\n`;
  out += `<div class="response-summary">Found ${hits.length} relevant matches across ${hitLabels.length || 1} area${hitLabels.length === 1 ? "" : "s"}.</div>\n`;
  if (hitLabels.length) {
    out += `<div class="response-chips">${hitLabels.map((label) => `<span class="response-chip">${label}</span>`).join("")}</div>\n\n`;
  }

  const syntax = hits.filter((h) => h.type === "syntax");
  const stdlib = hits.filter((h) => h.type === "stdlib_mod" || h.type === "stdlib_func");
  const packages = hits.filter((h) => h.type === "package" || h.type === "package_func");
  const cli = hits.filter((h) => h.type === "cli");
  const architecture = hits.filter((h) => h.type === "architecture");
  const examples = hits.filter((h) => h.type === "example");

  if (syntax.length) {
    out += "#### Syntax & Language\n";
    syntax.forEach((item) => {
      out += `**${item.topic}**\n${item.description}\n<pre><code class="vrb-code">${item.example}</code></pre>\n`;
    });
  }

  if (stdlib.length) {
    out += "#### Standard Library\n";
    stdlib.forEach((item) => {
      if (item.type === "stdlib_mod") out += `- \`${item.name}\`: ${item.funcs.map((func) => `\`${functionName(func)}\``).join(", ")}\n`;
      else out += `- \`${item.func}\` (module: \`${item.name}\`)${item.desc ? `: ${item.desc}` : ""}\n`;
    });
    out += "\n";
  }

  if (packages.length) {
    out += "#### Packages\n";
    packages.forEach((item) => {
      if (item.type === "package") out += `- \`${item.name}\` (latest v${item.versions[item.versions.length - 1]}): ${item.desc}. Install with \`${item.install}\`. Exports: ${item.functions.map((func) => `\`${packageFunctionName(func)}\``).join(", ") || "script-only package"}.\n`;
      else out += `- \`${item.func}\` is exported by \`${item.pkg}\`${item.desc ? `: ${item.desc}` : ""}.\n`;
    });
    out += "\n";
  }

  if (cli.length) {
    out += "#### CLI\n";
    cli.forEach((item) => { out += `- \`${item.cmd}\`: ${item.desc}\n`; });
    out += "\n";
  }

  if (architecture.length) {
    out += "#### Project Structure\n";
    architecture.forEach((item) => { out += `- **${item.file || item.dir}**: ${item.desc}\n`; });
    out += "\n";
  }

  if (examples.length) {
    out += "#### Examples\n";
    examples.forEach((item) => { out += `- \`${item.name}\`: ${item.desc}\n`; });
    out += "\n";
  }

  if (followups.length) {
    out += `<div class="followup-box"><h5>Try a follow-up</h5><div class="followup-list">${followups.map((item) => `<button class="followup-btn" data-query="${escapeHtmlAttr(item)}">${item}</button>`).join("")}</div></div>`;
  }

  return out.trim();
}

function escapeHtmlAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
