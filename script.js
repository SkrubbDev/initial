// Form generation and management
function generateForms() {
    const formsContainer = document.getElementById('formsContainer');
    
    if (!formsContainer) {
        console.error('Forms container not found!');
        return;
    }
    
    console.log('Forms container found, generating forms...');
    
    // Generate client form HTML
    const clientFormHTML = `
        <!-- Client Form Modal -->
        <div id="clientModal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
            <div class="flex items-center justify-center min-h-screen p-4">
                <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xl font-bold text-secondary font-lexend  tracking-[-2px]">Join Client Waiting List</h3>
                        <button onclick="closeModal('client')" class="text-gray-400 hover:text-gray-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    
                    <form id="clientForm" class="space-y-4" data-type="client">
                        <div>
                            <label for="clientName" class="block text-sm font-medium text-secondary mb-1 font-lexend">Full Name</label>
                            <input type="text" id="clientName" name="name" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                        </div>
                        
                        <div>
                            <label for="clientEmail" class="block text-sm font-medium text-secondary mb-1 font-lexend">Email Address</label>
                            <input type="email" id="clientEmail" name="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                        </div>
                        
                        <div>
                            <label for="clientPostalCode" class="block text-sm font-medium text-secondary mb-1 font-lexend">Postal Code</label>
                            <input type="text" id="clientPostalCode" name="postalCode" required pattern="[A-Za-z]\\d[A-Za-z] ?\\d[A-Za-z]\\d" placeholder="A1A 1A1" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                            <p class="text-xs text-gray-500 mt-1">Format: A1A 1A1</p>
                        </div>
                        
                        <div>
                            <label for="cleaningDetails" class="block text-sm font-medium text-secondary mb-1 font-lexend">Detail of what you'd like cleaned</label>
                            <textarea id="cleaningDetails" name="cleaningDetails" rows="3" maxlength="500" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Tell us about your cleaning needs..."></textarea>
                            <div class="flex justify-between items-center mt-1">
                                <span class="text-xs text-gray-500"><span id="cleaningDetailsCount">0</span>/500</span>
                            </div>
                        </div>
                        
                        <button type="submit" class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-md transition-colors">
                            Join Client Waiting List
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Generate contractor form HTML
    const contractorFormHTML = `
        <!-- Contractor Form Modal -->
        <div id="contractorModal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
            <div class="flex items-center justify-center min-h-screen p-4">
                <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xl font-bold text-secondary font-lexend">Join Cleaner Waiting List</h3>
                        <button onclick="closeModal('contractor')" class="text-gray-400 hover:text-gray-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    
                    <form id="contractorForm" class="space-y-4" data-type="contractor">
                        <div>
                            <label for="contractorName" class="block text-sm font-medium text-secondary mb-1 font-lexend">Full Name</label>
                            <input type="text" id="contractorName" name="name" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                        </div>
                        
                        <div>
                            <label for="contractorEmail" class="block text-sm font-medium text-secondary mb-1 font-lexend">Email Address</label>
                            <input type="email" id="contractorEmail" name="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                        </div>
                        
                        <div>
                            <label for="contractorPostalCode" class="block text-sm font-medium text-secondary mb-1 font-lexend">Postal Code</label>
                            <input type="text" id="contractorPostalCode" name="postalCode" required pattern="[A-Za-z]\\d[A-Za-z] ?\\d[A-Za-z]\\d" placeholder="A1A 1A1" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                            <p class="text-xs text-gray-500 mt-1">Format: A1A 1A1</p>
                        </div>
                        
                        <div>
                            <label for="canWorkInCanada" class="block text-sm font-medium text-secondary mb-1 font-lexend">Able to work in Canada?</label>
                            <select id="canWorkInCanada" name="canWorkInCanada" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                                <option value="">Select option</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        
                        <div>
                            <label for="cleaningExperience" class="block text-sm font-medium text-secondary mb-1 font-lexend">Talk about cleaning experience</label>
                            <textarea id="cleaningExperience" name="cleaningExperience" rows="3" maxlength="500" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Tell us about your cleaning experience..."></textarea>
                            <div class="flex justify-between items-center mt-1">
                                <span class="text-xs text-gray-500">Minimum 10 characters</span>
                                <span class="text-xs text-gray-500"><span id="cleaningExperienceCount">0</span>/500</span>
                            </div>
                        </div>
                        
                        <button type="submit" class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-md transition-colors">
                            Join Cleaner Waiting List
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Insert both forms into the container
    formsContainer.innerHTML = clientFormHTML + contractorFormHTML;
    
    console.log('Forms generated and inserted into DOM');
    console.log('Client form element:', document.getElementById('clientForm'));
    console.log('Contractor form element:', document.getElementById('contractorForm'));
    
    // Setup form functionality after generation
    setupFormFunctionality();
}

// Modal functionality
function openModal(type) {
    if (type === 'client') {
        const modal = document.getElementById('clientModal');
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else if (type === 'contractor') {
        const modal = document.getElementById('contractorModal');
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(type) {
    let modal, form;
    
    if (type === 'client') {
        modal = document.getElementById('clientModal');
        form = document.getElementById('clientForm');
    } else if (type === 'contractor') {
        modal = document.getElementById('contractorModal');
        form = document.getElementById('contractorForm');
    }
    
    if (modal && form) {
        // Hide modal
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        
        // Reset form
        form.reset();
        
        // Clear field errors based on form type
        if (type === 'client') {
            ['clientName', 'clientEmail', 'clientPostalCode', 'cleaningDetails'].forEach(fieldId => {
                clearFieldError(fieldId);
            });
        } else if (type === 'contractor') {
            ['contractorName', 'contractorEmail', 'contractorPostalCode', 'canWorkInCanada', 'cleaningExperience'].forEach(fieldId => {
                clearFieldError(fieldId);
            });
        }
        
        // Reset character counts
        const cleaningDetailsCount = document.getElementById('cleaningDetailsCount');
        const cleaningExperienceCount = document.getElementById('cleaningExperienceCount');
        if (cleaningDetailsCount) cleaningDetailsCount.textContent = '0';
        if (cleaningExperienceCount) cleaningExperienceCount.textContent = '0';
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const clientModal = document.getElementById('clientModal');
    const contractorModal = document.getElementById('contractorModal');
    
    if (e.target === clientModal) {
        closeModal('client');
    } else if (e.target === contractorModal) {
        closeModal('contractor');
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const clientModal = document.getElementById('clientModal');
        const contractorModal = document.getElementById('contractorModal');
        
        if (!clientModal.classList.contains('hidden')) {
            closeModal('client');
        } else if (!contractorModal.classList.contains('hidden')) {
            closeModal('contractor');
        }
    }
});

// Form validation functions
function validateName(name) {
    if (!name || name.trim().length < 2) {
        return { isValid: false, message: 'Name must be at least 2 characters long' };
    }
    if (name.trim().length > 50) {
        return { isValid: false, message: 'Name must be less than 50 characters' };
    }
    if (!/^[a-zA-Z\s\-']+$/.test(name.trim())) {
        return { isValid: false, message: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
    }
    return { isValid: true, message: '' };
}

function validateEmail(email) {
    if (!email || email.trim().length === 0) {
        return { isValid: false, message: 'Email is required' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        return { isValid: false, message: 'Please enter a valid email address' };
    }
    if (email.trim().length > 100) {
        return { isValid: false, message: 'Email must be less than 100 characters' };
    }
    return { isValid: true, message: '' };
}

function validatePostalCode(postalCode) {
    if (!postalCode || postalCode.trim().length === 0) {
        return { isValid: false, message: 'Postal code is required' };
    }
    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/;
    if (!postalCodeRegex.test(postalCode.trim())) {
        return { isValid: false, message: 'Please enter a valid Canadian postal code (e.g., A1A 1A1)' };
    }
    return { isValid: true, message: '' };
}

function validateCleaningDetails(details, type) {
    if (type === 'client') {
        if (!details || details.trim().length === 0) {
            return { isValid: false, message: 'Please describe what you would like cleaned' };
        }
        if (details.trim().length < 10) {
            return { isValid: false, message: 'Please provide more details (at least 10 characters)' };
        }
        if (details.trim().length > 500) {
            return { isValid: false, message: 'Details must be less than 500 characters' };
        }
    }
    return { isValid: true, message: '' };
}

function validateContractorFields(data) {
    if (data.type === 'contractor') {
        if (!data.canWorkInCanada || data.canWorkInCanada === '') {
            return { isValid: false, message: 'Please select whether you can work in Canada' };
        }
        if (!data.cleaningExperience || data.cleaningExperience.trim().length === 0) {
            return { isValid: false, message: 'Please describe your cleaning experience' };
        }
        if (data.cleaningExperience.trim().length < 10) {
            return { isValid: false, message: 'Please provide more details about your experience (at least 10 characters)' };
        }
        if (data.cleaningExperience.trim().length > 500) {
            return { isValid: false, message: 'Experience description must be less than 500 characters' };
        }
    }
    return { isValid: true, message: '' };
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = field.parentNode.querySelector('.field-error');
    
    // Remove existing error
    if (errorDiv) {
        errorDiv.remove();
    }
    
    // Add error styling to field
    field.classList.add('border-red-500', 'focus:ring-red-500');
    field.classList.remove('border-gray-300', 'focus:ring-primary');
    
    // Create and show error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error text-red-500 text-sm mt-1';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    const errorDiv = field.parentNode.querySelector('.field-error');
    
    // Remove error styling
    field.classList.remove('border-red-500', 'focus:ring-red-500');
    field.classList.add('border-gray-300', 'focus:ring-primary');
    
    // Remove error message
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Setup form functionality
function setupFormFunctionality() {
    console.log('Setting up form functionality...');
    
    // Client form submission
    const clientForm = document.getElementById('clientForm');
    if (clientForm) {
        console.log('Client form found, setting up event listener');
        clientForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            // Clear all previous errors
            ['clientName', 'clientEmail', 'clientPostalCode', 'cleaningDetails'].forEach(fieldId => {
                clearFieldError(fieldId);
            });
            
            // Validate all fields
            const name = formData.get('name');
            const email = formData.get('email');
            const postalCode = formData.get('postalCode');
            const cleaningDetails = formData.get('cleaningDetails');
            
            let hasErrors = false;
            
            // Validate required fields
            const nameValidation = validateName(name);
            if (!nameValidation.isValid) {
                showFieldError('clientName', nameValidation.message);
                hasErrors = true;
            }
            
            const emailValidation = validateEmail(email);
            if (!emailValidation.isValid) {
                showFieldError('clientEmail', emailValidation.message);
                hasErrors = true;
            }
            
            const postalCodeValidation = validatePostalCode(postalCode);
            if (!postalCodeValidation.isValid) {
                showFieldError('clientPostalCode', postalCodeValidation.message);
                hasErrors = true;
            }
            
            // Validate cleaning details
            const cleaningDetailsValidation = validateCleaningDetails(cleaningDetails, 'client');
            if (!cleaningDetailsValidation.isValid) {
                showFieldError('cleaningDetails', cleaningDetailsValidation.message);
                hasErrors = true;
            }
            
            // If there are validation errors, don't submit
            if (hasErrors) {
                showNotification('Please fix the errors above before submitting', 'error');
                return;
            }
            
            // Collect form data
            const data = {
                type: 'client',
                name: name.trim(),
                email: email.trim(),
                postalCode: postalCode.trim(),
                cleaningDetails: cleaningDetails.trim()
            };
            
            // Submit to waiting list
            submitToWaitingList(data);
        });
    }
    
    // Contractor form submission
    const contractorForm = document.getElementById('contractorForm');
    if (contractorForm) {
        console.log('Contractor form found, setting up event listener');
        contractorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            // Clear all previous errors
            ['contractorName', 'contractorEmail', 'contractorPostalCode', 'canWorkInCanada', 'cleaningExperience'].forEach(fieldId => {
                clearFieldError(fieldId);
            });
            
            // Validate all fields
            const name = formData.get('name');
            const email = formData.get('email');
            const postalCode = formData.get('postalCode');
            const canWorkInCanada = formData.get('canWorkInCanada');
            const cleaningExperience = formData.get('cleaningExperience');
            
            let hasErrors = false;
            
            // Validate required fields
            const nameValidation = validateName(name);
            if (!nameValidation.isValid) {
                showFieldError('contractorName', nameValidation.message);
                hasErrors = true;
            }
            
            const emailValidation = validateEmail(email);
            if (!emailValidation.isValid) {
                showFieldError('contractorEmail', emailValidation.message);
                hasErrors = true;
            }
            
            const postalCodeValidation = validatePostalCode(postalCode);
            if (!postalCodeValidation.isValid) {
                showFieldError('contractorPostalCode', postalCodeValidation.message);
                hasErrors = true;
            }
            
            // Validate contractor-specific fields
            if (!canWorkInCanada || canWorkInCanada === '') {
                showFieldError('canWorkInCanada', 'Please select whether you can work in Canada');
                hasErrors = true;
            }
            
            const experienceValidation = validateCleaningDetails(cleaningExperience, 'contractor');
            if (!experienceValidation.isValid) {
                showFieldError('cleaningExperience', experienceValidation.message);
                hasErrors = true;
            }
            
            // If there are validation errors, don't submit
            if (hasErrors) {
                showNotification('Please fix the errors above before submitting', 'error');
                return;
            }
            
            // Collect form data
            const data = {
                type: 'contractor',
                name: name.trim(),
                email: email.trim(),
                postalCode: postalCode.trim(),
                canWorkInCanada: canWorkInCanada,
                cleaningExperience: cleaningExperience.trim()
            };
            
            // Submit to waiting list
            submitToWaitingList(data);
        });
    }
    
    // Setup real-time validation
    setupRealTimeValidation();
}

// Real-time validation
function setupRealTimeValidation() {
    // Client form fields
    const clientFields = ['clientName', 'clientEmail', 'clientPostalCode', 'cleaningDetails'];
    
    clientFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            // Validate on blur (when user leaves the field)
            field.addEventListener('blur', function() {
                validateField(fieldId, this.value);
            });
            
            // Clear error on focus
            field.addEventListener('focus', function() {
                clearFieldError(fieldId);
            });
            
            // Validate on input for postal code (real-time format checking)
            if (fieldId === 'clientPostalCode') {
                field.addEventListener('input', function() {
                    // Auto-format postal code as user types
                    let value = this.value.toUpperCase();
                    value = value.replace(/[^A-Z0-9]/g, '');
                    
                    if (value.length >= 3) {
                        value = value.slice(0, 3) + ' ' + value.slice(3);
                    }
                    if (value.length >= 7) {
                        value = value.slice(0, 7);
                    }
                    
                    this.value = value;
                });
            }
            
            // Add character count for textarea fields
            if (fieldId === 'cleaningDetails') {
                const countElement = document.getElementById(fieldId + 'Count');
                if (countElement) {
                    field.addEventListener('input', function() {
                        countElement.textContent = this.value.length;
                        
                        // Change color based on length
                        if (this.value.length < 10) {
                            countElement.classList.add('text-red-500');
                            countElement.classList.remove('text-gray-500');
                        } else {
                            countElement.classList.remove('text-red-500');
                            countElement.classList.add('text-gray-500');
                        }
                    });
                }
            }
        }
    });
    
    // Contractor form fields
    const contractorFields = ['contractorName', 'contractorEmail', 'contractorPostalCode', 'cleaningExperience'];
    
    contractorFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            // Validate on blur (when user leaves the field)
            field.addEventListener('blur', function() {
                validateField(fieldId, this.value);
            });
            
            // Clear error on focus
            field.addEventListener('focus', function() {
                clearFieldError(fieldId);
            });
            
            // Validate on input for postal code (real-time format checking)
            if (fieldId === 'contractorPostalCode') {
                field.addEventListener('input', function() {
                    // Auto-format postal code as user types
                    let value = this.value.toUpperCase();
                    value = value.replace(/[^A-Z0-9]/g, '');
                    
                    if (value.length >= 3) {
                        value = value.slice(0, 3) + ' ' + value.slice(3);
                    }
                    if (value.length >= 7) {
                        value = value.slice(0, 7);
                    }
                    
                    this.value = value;
                });
            }
            
            // Add character count for textarea fields
            if (fieldId === 'cleaningExperience') {
                const countElement = document.getElementById(fieldId + 'Count');
                if (countElement) {
                    field.addEventListener('input', function() {
                        countElement.textContent = this.value.length;
                        
                        // Change color based on length
                        if (this.value.length < 10) {
                            countElement.classList.add('text-red-500');
                            countElement.classList.remove('text-gray-500');
                        } else {
                            countElement.classList.remove('text-red-500');
                            countElement.classList.add('text-gray-500');
                        }
                    });
                }
            }
        }
    });
    
    // Special handling for select fields
    const canWorkInCanadaField = document.getElementById('canWorkInCanada');
    if (canWorkInCanadaField) {
        canWorkInCanadaField.addEventListener('change', function() {
            if (this.value === '') {
                showFieldError('canWorkInCanada', 'Please select whether you can work in Canada');
            } else {
                clearFieldError('canWorkInCanada');
            }
        });
    }
}

function validateField(fieldId, value) {
    switch (fieldId) {
        case 'clientName':
        case 'contractorName':
            const nameValidation = validateName(value);
            if (!nameValidation.isValid) {
                showFieldError(fieldId, nameValidation.message);
            }
            break;
        case 'clientEmail':
        case 'contractorEmail':
            const emailValidation = validateEmail(value);
            if (!emailValidation.isValid) {
                showFieldError(fieldId, emailValidation.message);
            }
            break;
        case 'clientPostalCode':
        case 'contractorPostalCode':
            const postalCodeValidation = validatePostalCode(value);
            if (!postalCodeValidation.isValid) {
                showFieldError(fieldId, postalCodeValidation.message);
            }
            break;
        case 'cleaningDetails':
            const cleaningDetailsValidation = validateCleaningDetails(value, 'client');
            if (!cleaningDetailsValidation.isValid) {
                showFieldError(fieldId, cleaningDetailsValidation.message);
            }
            break;
        case 'cleaningExperience':
            const experienceValidation = validateCleaningDetails(value, 'contractor');
            if (!experienceValidation.isValid) {
                showFieldError(fieldId, experienceValidation.message);
            }
            break;
    }
}

function submitToWaitingList(data) {
    // Find the correct submit button based on form type
    let submitBtn, formId;
    
    if (data.type === 'client') {
        formId = 'clientForm';
        submitBtn = document.querySelector('#clientForm button[type="submit"]');
    } else if (data.type === 'contractor') {
        formId = 'contractorForm';
        submitBtn = document.querySelector('#contractorForm button[type="submit"]');
    }
    
    if (!submitBtn) {
        console.error('Submit button not found for form type:', data.type);
        showNotification('Error: Form not found. Please refresh the page and try again.', 'error');
        return;
    }
    
    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Get Google Apps Script URL from config
    const GOOGLE_SCRIPT_URL = CONFIG.GOOGLE_SCRIPT_URL;
    
    // Send data to Google Sheets
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        // Since we're using no-cors, we can't read the response
        // But we'll assume success if no error was thrown
        
        // Success - show confirmation
        showNotification('Success! You have been added to the waiting list.', 'success');
        
        // Reset form and close modal
        closeModal(data.type);
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        console.log('Waiting list submission successful:', data);
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        
        // Show error notification
        showNotification('Sorry, there was an error submitting your form. Please try again.', 'error');
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full`;
    
    // Set notification content and styling based on type
    if (type === 'success') {
        notification.className += ' bg-green-500 text-white';
    } else if (type === 'error') {
        notification.className += ' bg-red-500 text-white';
    } else {
        notification.className += ' bg-blue-500 text-white';
    }
    
    notification.innerHTML = `
        <div class="flex items-center">
            <span class="flex-1">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navigation
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('bg-white/95', 'shadow-md');
    } else {
        nav.classList.remove('bg-white/95', 'shadow-md');
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Skrubb landing page loaded successfully!');
    
    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Generate forms immediately
    generateForms();
    
    // Add any additional initialization code here
    // For example, analytics tracking, A/B testing, etc.
});
