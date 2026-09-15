const SUPABASE_URL = "https://wwtguhsxuprzphgbmbkp.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3dGd1aHN4dXByenBoZ2JtYmtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3NDg2ODgsImV4cCI6MjA2MjMyNDY4OH0.Q5t378WHJFL_FxcFuYhbusoKy8gQGvN43bhKtk5jVvI";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function searchPeople() {
  const name = document.getElementById("name").value.trim();
  const license = document.getElementById("license").value.trim();
  const message = document.getElementById("message");
  const results = document.getElementById("results");

  results.innerHTML = "";
  message.textContent = "";

  if (!name && !license) {
    message.textContent = "Error: enter name or license.";
    return;
  }

  if (name && license) {
    message.textContent = "Error: enter only one.";
    return;
  }

  let query;
  if (name) {
    query = supabase
      .from("People")
      .select("*")
      .ilike("Name", `%${name}%`);
  } else {
    query = supabase
      .from("People")
      .select("*")
      .eq("LicenseNumber", license);
  }

  const { data, error } = await query;

  if (error) {
    message.textContent = "Error connecting to database.";
    console.error(error);
    return;
  }

  if (!data || data.length === 0) {
    message.textContent = "No result found";
    return;
  }

  message.textContent = "Search successful";

  data.forEach((person) => {
    const div = document.createElement("div");
    div.textContent = `Name: ${person.Name}, License: ${person.LicenseNumber}, DOB: ${person.DOB}, Address: ${person.Address}`;
    results.appendChild(div);
  });
}

async function searchVehicle() {
  const rego = document.getElementById("rego").value.trim();
  const message = document.getElementById("message");
  const results = document.getElementById("results");

  results.innerHTML = "";
  message.textContent = "";

  if (!rego) {
    message.textContent = "Error: please enter registration number.";
    return;
  }

  const { data: vehicles, error } = await supabase
    .from("Vehicles")
    .select("*")
    .eq("VehicleID", rego);

  if (error || !vehicles.length) {
    message.textContent = "No result found";
    return;
  }

  const vehicle = vehicles[0];
  let ownerText = "Owner: Unknown";

  if (vehicle.OwnerID) {
    const { data: owners } = await supabase
      .from("People")
      .select("*")
      .eq("PersonID", vehicle.OwnerID);

    if (owners && owners.length) {
      const o = owners[0];
      ownerText = `Owner: ${o.Name}, License: ${o.LicenseNumber}`;
    }
  }

  message.textContent = "Search successful";

  const div = document.createElement("div");
  div.textContent = `Make: ${vehicle.Make}, Model: ${vehicle.Model}, Colour: ${vehicle.Colour}, ${ownerText}`;
  results.appendChild(div);
}

let selectedOwnerId = null;

async function checkOwner() {
  const ownerName = document.getElementById("owner").value.trim();
  const results = document.getElementById("owner-results");
  const message = document.getElementById("message-owner");
  selectedOwnerId = null;
  results.innerHTML = "";
  message.textContent = "";

  const { data, error } = await supabase
    .from("People")
    .select("*")
    .ilike("Name", `%${ownerName}%`);

  if (error || !data.length) {
    message.textContent = "No matching owner found";
    return;
  }

  const owner = data[0];
  selectedOwnerId = owner.PersonID;
  results.innerHTML = `Found: ${owner.Name}, License: ${owner.LicenseNumber}`;
  message.textContent = "Owner selected";
}

async function addOwner() {
  const name = document.getElementById('name').value.trim();
  const address = document.getElementById('address').value.trim();
  const dob = document.getElementById('dob').value;
  const license = document.getElementById('license').value.trim();
  const message = document.getElementById('message-owner');

  if (!name || !address || !dob || !license) {
    message.textContent = 'Please fill in all new owner fields.';
    return;
  }

  // Check if owner already exists
  const { data: existing, error: findError } = await supabase
    .from('People')
    .select('*')
    .or(`Name.eq.${name},LicenseNumber.eq.${license}`);

  if (findError) {
    message.textContent = 'Error checking existing owners.';
    return;
  }

  if (existing && existing.length > 0) {
    selectedOwnerId = existing[0].PersonID;
    message.textContent = 'Owner already exists and is now selected.';
    return;
  }

  // Insert new owner and get back PersonID
  const { data, error } = await supabase
    .from('People')
    .insert([{ Name: name, Address: address, DOB: dob, LicenseNumber: license }])
    .select(); // 🟢 IMPORTANT: Get the inserted row back

  if (error || !data) {
  console.error('Insert error:', error.message); // <== add this line!
  message.textContent = 'Error adding new owner.';
  return;
}


  selectedOwnerId = data[0].PersonID; // 🟢 This ensures it's NOT NULL
  message.textContent = 'New owner added successfully and selected.';
}


async function addVehicle() {
  const rego = document.getElementById("rego").value.trim();
  const make = document.getElementById("make").value.trim();
  const model = document.getElementById("model").value.trim();
  const colour = document.getElementById("colour").value.trim();
  const message = document.getElementById("message-vehicle");

  if (!rego || !make || !model || !colour || !selectedOwnerId) {
    message.textContent = "Error: all fields and owner must be set";
    return;
  }

  const { error } = await supabase
    .from("Vehicles")
    .insert([{ VehicleID: rego, Make: make, Model: model, Colour: colour, OwnerID: selectedOwnerId }]);

  if (error) {
    message.textContent = "Error adding vehicle";
    return;
  }

  message.textContent = "Vehicle added successfully!";
}
