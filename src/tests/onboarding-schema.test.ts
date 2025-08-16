import { describe, it, expect, beforeEach } from '@jest/globals';
import { onboardingSchema, OnboardingFormData } from '@/lib/validations/onboarding-schema';
import { SERVICE_OPTIONS } from '@/lib/constants/form-options';

describe('Onboarding Schema Validation', () => {
    let validFormData: OnboardingFormData;

    beforeEach(() => {
        validFormData = {
            fullName: 'John Doe',
            email: 'john.doe@example.com',
            companyName: 'Acme Corp',
            services: ['web-development'],
            budgetUsd: 50000,
            projectStartDate: new Date('2025-12-01'),
            acceptTerms: true,
        };
    });

    describe('Valid Data', () => {
        it('should pass validation with all valid required fields', () => {
            const result = onboardingSchema.safeParse(validFormData);
            expect(result.success).toBe(true);
        });

        it('should pass validation without optional budget field', () => {
            const { budgetUsd, ...dataWithoutBudget } = validFormData;
            const result = onboardingSchema.safeParse(dataWithoutBudget);
            expect(result.success).toBe(true);
        });

        it('should pass validation with multiple services', () => {
            const dataWithMultipleServices = {
                ...validFormData,
                services: ['web-development', 'mobile-development', 'ui-ux-design'],
            };
            const result = onboardingSchema.safeParse(dataWithMultipleServices);
            expect(result.success).toBe(true);
        });
    });

    describe('Full Name Validation', () => {
        it('should fail with empty full name', () => {
            const invalidData = { ...validFormData, fullName: '' };
            const result = onboardingSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('at least 2 characters');
            }
        });

        it('should fail with single character full name', () => {
            const invalidData = { ...validFormData, fullName: 'J' };
            const result = onboardingSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('at least 2 characters');
            }
        });

        it('should fail with full name over 100 characters', () => {
            const invalidData = {
                ...validFormData,
                fullName: 'a'.repeat(101)
            };
            const result = onboardingSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('less than 100 characters');
            }
        });

        it('should fail with invalid characters in full name', () => {
            const invalidData = { ...validFormData, fullName: 'John123 Doe' };
            const result = onboardingSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('letters, spaces, hyphens, and apostrophes');
            }
        });

        it('should pass with valid special characters in full name', () => {
            const validNames = [
                "Mary O'Connor",
                "Jean-Luc Picard",
                "Anne-Marie Smith",
                "Patrick O'Brien-Johnson"
            ];

            validNames.forEach(name => {
                const data = { ...validFormData, fullName: name };
                const result = onboardingSchema.safeParse(data);
                expect(result.success).toBe(true);
            });
        });
    });

    describe('Email Validation', () => {
        it('should fail with invalid email format', () => {
            const invalidEmails = [
                'invalid-email',
                'test@',
                '@domain.com',
                'test..test@domain.com',
                'test@domain',
            ];

            invalidEmails.forEach(email => {
                const invalidData = { ...validFormData, email };
                const result = onboardingSchema.safeParse(invalidData);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toContain('valid email address');
                }
            });
        });

        it('should fail with email over 255 characters', () => {
            const longEmail = `${'a'.repeat(250)}@test.com`;
            const invalidData = { ...validFormData, email: longEmail };
            const result = onboardingSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('less than 255 characters');
            }
        });

        it('should pass with valid email formats', () => {
            const validEmails = [
                'test@example.com',
                'user.name@company.co.uk',
                'admin+test@domain.org',
                'user123@test-domain.com',
            ];

            validEmails.forEach(email => {
                const data = { ...validFormData, email };
                const result = onboardingSchema.safeParse(data);
                expect(result.success).toBe(true);
            });
        });
    });

    describe('Company Name Validation', () => {
        it('should fail with empty company name', () => {
            const invalidData = { ...validFormData, companyName: '' };
            const result = onboardingSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('at least 2 characters');
            }
        });

        it('should fail with company name over 200 characters', () => {
            const invalidData = {
                ...validFormData,
                companyName: 'a'.repeat(201)
            };
            const result = onboardingSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('less than 200 characters');
            }
        });

        it('should pass with valid company name characters', () => {
            const validCompanyNames = [
                'Acme Corp',
                'Tech & Solutions Ltd.',
                "McDonald's",
                'IBM-Microsoft',
                'Company 123',
                'A&B Solutions, Inc.',
            ];

            validCompanyNames.forEach(companyName => {
                const data = { ...validFormData, companyName };
                const result = onboardingSchema.safeParse(data);
                expect(result.success).toBe(true);
            });
        });

        it('should fail with invalid company name characters', () => {
            const invalidCompanyNames = [
                'Company@Email',
                'Test#Company',
                'Company%Ltd',
                'Test*Corp',
            ];

            invalidCompanyNames.forEach(companyName => {
                const data = { ...validFormData, companyName };
                const result = onboardingSchema.safeParse(data);
                expect(result.success).toBe(false);
                if (!result.success) {
                    expect(result.error.issues[0].message).toContain('invalid characters');
                }
            });
        });
    });

    describe('Services Validation', () => {
        it('should fail with empty services array', () => {
            const invalidData = { ...validFormData, services: [] };
            const result = onboardingSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('at least one service');
            }
        });

        it('should fail with more than 10 services', () => {
            const tooManyServices = Array.from({ length: 11 }, (_, i) => `service-${i}`);
            const invalidData = { ...validFormData, services: tooManyServices };
            const result = onboardingSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('up to 10 services');
            }
        });

        it('should pass with valid service selections', () => {
            const validServiceCombinations = [
                ['web-development'],
                ['web-development', 'mobile-development'],
                SERVICE_OPTIONS.slice(0, 5).map(s => s.id),
                SERVICE_OPTIONS.map(s => s.id), // All services
            ];

            validServiceCombinations.forEach(services => {
                const data = { ...validFormData, services };
                const result = onboardingSchema.safeParse(data);
                expect(result.success).toBe(true);
            });
        });
    });

    describe('Budget Validation', () => {
        it('should pass with undefined budget (optional field)', () => {
            const data = { ...validFormData, budgetUsd: undefined };
            const result = onboardingSchema.safeParse(data);
            expect(result.success).toBe(true);
        });

        it('should fail with budget below minimum', () => {
            const invalidData = { ...validFormData, budgetUsd: 99 };
            const result = onboardingSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('Minimum budget is $100');
            }
        });

        it('should fail with budget above maximum', () => {
            const invalidData = { ...validFormData, budgetUsd: 1000001 };
            const result = onboardingSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('Maximum budget is $1,000,000');
            }
        });

        it('should fail with non-integer budget', () => {
            const invalidData = { ...validFormData, budgetUsd: 1000.50 };
            const result = onboardingSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('whole number');
            }
        });

        it('should pass with valid budget values', () => {
            const validBudgets = [100, 1000, 50000, 500000, 1000000];

            validBudgets.forEach(budgetUsd => {
                const data = { ...validFormData, budgetUsd };
                const result = onboardingSchema.safeParse(data);
                expect(result.success).toBe(true);
            });
        });
    });

    describe('Project Start Date Validation', () => {
        it('should fail with missing project start date', () => {
            const { projectStartDate, ...dataWithoutDate } = validFormData;
            const result = onboardingSchema.safeParse(dataWithoutDate);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('required');
            }
        });

        it('should fail with past date', () => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const invalidData = { ...validFormData, projectStartDate: yesterday };
            const result = onboardingSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('cannot be in the past');
            }
        });

        it('should pass with today\'s date', () => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const data = { ...validFormData, projectStartDate: today };
            const result = onboardingSchema.safeParse(data);
            expect(result.success).toBe(true);
        });

        it('should pass with future dates', () => {
            const futureDates = [
                new Date('2025-12-01'),
                new Date('2026-01-15'),
                new Date('2027-06-30'),
            ];

            futureDates.forEach(projectStartDate => {
                const data = { ...validFormData, projectStartDate };
                const result = onboardingSchema.safeParse(data);
                expect(result.success).toBe(true);
            });
        });

        it('should fail with invalid date type', () => {
            const invalidData = { ...validFormData, projectStartDate: 'invalid-date' as any };
            const result = onboardingSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('valid date');
            }
        });
    });

    describe('Accept Terms Validation', () => {
        it('should fail when terms are not accepted', () => {
            const invalidData = { ...validFormData, acceptTerms: false };
            const result = onboardingSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('accept the terms');
            }
        });

        it('should pass when terms are accepted', () => {
            const data = { ...validFormData, acceptTerms: true };
            const result = onboardingSchema.safeParse(data);
            expect(result.success).toBe(true);
        });

        it('should fail with non-boolean value', () => {
            const invalidData = { ...validFormData, acceptTerms: 'true' as any };
            const result = onboardingSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });
    });

    describe('Type Inference', () => {
        it('should properly infer types from schema', () => {
            const result = onboardingSchema.safeParse(validFormData);
            if (result.success) {
                // Type assertions to ensure proper type inference
                const data: OnboardingFormData = result.data;
                expect(typeof data.fullName).toBe('string');
                expect(typeof data.email).toBe('string');
                expect(typeof data.companyName).toBe('string');
                expect(Array.isArray(data.services)).toBe(true);
                expect(typeof data.budgetUsd === 'number' || data.budgetUsd === undefined).toBe(true);
                expect(data.projectStartDate instanceof Date).toBe(true);
                expect(typeof data.acceptTerms).toBe('boolean');
            }
        });
    });

    describe('Edge Cases', () => {
        it('should handle null values appropriately', () => {
            const nullData = {
                fullName: null,
                email: null,
                companyName: null,
                services: null,
                budgetUsd: null,
                projectStartDate: null,
                acceptTerms: null,
            };
            const result = onboardingSchema.safeParse(nullData);
            expect(result.success).toBe(false);
        });

        it('should handle undefined values appropriately', () => {
            const undefinedData = {
                fullName: undefined,
                email: undefined,
                companyName: undefined,
                services: undefined,
                budgetUsd: undefined,
                projectStartDate: undefined,
                acceptTerms: undefined,
            };
            const result = onboardingSchema.safeParse(undefinedData);
            expect(result.success).toBe(false);
        });

        it('should handle empty object', () => {
            const result = onboardingSchema.safeParse({});
            expect(result.success).toBe(false);
        });
    });
});