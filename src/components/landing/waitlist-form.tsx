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
function doPost(e) {
  try {
    // Ensure the sheet is correctly identified.
    // Replace "Sheet1" if your sheet has a different name.
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    if (!sheet) {
      throw new Error("Sheet 'Sheet1' not found. Please create it or update the script with the correct name.");
    }

    const data = JSON.parse(e.postData.contents);

    // Make sure all expected fields are present
    if (!data.fullName || !data.preferredMeal || !data.address || !data.phone || !data.deliveryTime) {
       throw new Error("One or more required fields are missing in the submitted data.");
    }
    
    sheet.appendRow([
      new Date(),
      data.fullName,
      data.preferredMeal,
      data.address,
      data.phone,
      data.deliveryTime
    ]);
    
    // Return a proper success response
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Return a proper error response for debugging
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  preferredMeal: z.string().min(3, { message: 'Please enter your preferred meal.' }),
  address: z.string().min(10, { message: 'Please enter a valid address.' }),
  phone: z.string().regex(/^\d{10}$/, { message: 'Please enter a valid 10-digit phone number.' }),
  deliveryTime: z.enum(['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM']),
});

type FormValues = z.infer<typeof formSchema>;

export default function WaitlistForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      preferredMeal: '',
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
      // We are deliberately not using `no-cors` here to be able to read the response.
      // The Google Apps Script needs to be deployed correctly to handle CORS.
      const response = await fetch(FORM_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        }
      });

      const result = await response.json();

      if (result.result === 'success') {
        toast({
          title: 'Success!',
          description: "You've been added to the Nourishora waitlist.",
        });
        form.reset();
      } else {
        throw new Error(result.message || 'An unknown error occurred on the server.');
      }
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message || 'There was a problem with your request. Please try again.',
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
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferredMeal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Healthy Meal</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your preferred healthy meal" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full office address" {...field} />
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
                          <Input type="tel" placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
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
                  />
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
