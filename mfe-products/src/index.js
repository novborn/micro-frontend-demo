// Module Federation requires the real entry logic to load asynchronously.
// This tiny file is the trick that makes that possible.
import("./bootstrap");
