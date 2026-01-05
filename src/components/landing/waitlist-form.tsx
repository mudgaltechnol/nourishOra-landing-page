'use client';
// SETUP INSTRUCTIONS:
// 1. Create a new Google Sheet to store waitlist data.
// 2. Open the sheet, go to Extensions > Apps Script.
// 3. Paste the provided Google Apps Script code into the script editor.
// 4. In the script, replace 'YOUR_SHEET_ID' with your Google Sheet's ID.
// 5. Deploy the script as a Web App: Click Deploy > New deployment. Select "Web app", configure access to "Anyone", and click Deploy.
// 6. Copy the generated Web App URL.
// 7. Update the `FORM_URL` constant below with your Web App URL.

/*
// GOOGLE APPS SCRIPT CODE (for reference):
// This script is now flexible. It will not break if you remove fields from your form.
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    if (!sheet) {
      throw new Error("Sheet 'Sheet1' not found. Please create it or update the script with the correct name.");
    }

    const data = JSON.parse(e.postData.contents);
    
    // Ensure the sheet has a header row if it's empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Full Name", "Preferred Meal", "Address", "Phone", "Delivery Time", "Preferred Price Range"]);
    }

    // This approach handles missing fields gracefully.
    // If a field is missing from the form, it will be stored as an empty string.
    const rowData = [
      new Date(),
      data.fullName || '',
      data.preferredMeal || '',
      data.address || '',
      data.phone || '',
      data.deliveryTime || '',
      data.preferredPriceRange || '',
    ];
    
    sheet.appendRow(rowData);
    
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
*/

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { IndianRupee } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Replace with your Google Apps Script Web App URL
const FORM_URL = "https://script.google.com/macros/s/AKfycbxidcUOhLpP9-pfsclSPtU12HfZ0GLeZIKA0veLeUuzClBcP2UuFFTbwOu2aPDWgw-_KA/exec";

// const priceRanges = [
//   '₹120 – ₹130 (Everyday meals)',
//   '₹130 – ₹145 (Balanced meals)',
//   '₹145 – ₹180 (Includes premium meals)',
//   'Not sure yet',
// ] as const;

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  // preferredMeal: z.string().min(3, { message: 'Please enter your preferred meal.' }),
  address: z.string().min(1, { message: 'Please enter a valid address.' }),
  phone: z.string().regex(/^\d{10,13}$/, { message: 'Please enter a valid 10 to 13-digit phone number.' }),
  // deliveryTime: z.enum(['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM']),
  // preferredPriceRange: z.enum(priceRanges),
});

type FormValues = z.infer<typeof formSchema>;

export default function WaitlistForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      // preferredMeal: '',
      address: '',
      phone: '',
    },
  });

  async function onSubmit(data: FormValues) {
    if (FORM_URL.includes("YOUR_SCRIPT_ID")) {
        toast({
            variant: "destructive",
            title: "Setup Required",
            description: "Please update the FORM_URL in waitlist-form.tsx with your Google Apps Script URL.",
        });
        return;
    }

    setIsLoading(true);
    try {
       // Create a complete data object with empty strings for missing fields
      // to ensure compatibility with a strict Google Apps Script.
      const submissionData = {
        ...data,
        preferredMeal: '',
        deliveryTime: '',
        preferredPriceRange: '',
      };

      const response = await fetch(FORM_URL, {
        method: 'POST',
        body: JSON.stringify(submissionData),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors'
      });

      // Since mode is 'no-cors', we can't read the response. 
      // We'll assume success and let the user know.
      // The Google Sheet will be the source of truth for successful submissions.
      toast({
        title: 'Success!',
        description: "You've been added to the Nourishora waitlist. We'll be in touch!",
      });
      form.reset();

    } catch (error: any) {
      console.error('Form submission error:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="waitlist" className="w-full bg-[#0F1716] text-white py-12 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl">
          <Card className="bg-transparent border-zinc-700">
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                Join the Nourishora Waitlist
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Be the first to know when we launch in your area!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <FormField
                    control={form.control}
                    name="preferredMeal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Healthy Meal</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Quinoa Salad, Grilled Chicken" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Office Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your office address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Enter phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <FormField
                    control={form.control}
                    name="deliveryTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Delivery Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a time slot" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                            <SelectItem value="12:30 PM">12:30 PM</SelectItem>
                            <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                            <SelectItem value="1:30 PM">1:30 PM</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                  {/* <FormField
                    control={form.control}
                    name="preferredPriceRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Daily Price Range</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                             <SelectTrigger>
                              <SelectValue placeholder="Select a price range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {priceRanges.map((range) => (
                              <SelectItem key={range} value={range}>
                                <div className="flex items-center gap-2">
                                  <IndianRupee className="h-4 w-4" />
                                  <span>
                                    {range === 'Not sure yet'
                                      ? range
                                      : range.replace(/₹/g, '').trim()}
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                  <Button type="submit" className="w-full" disabled={isLoading} variant="secondary">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      'Join The Waitlist'
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
