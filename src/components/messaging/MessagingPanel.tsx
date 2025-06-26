import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, Users, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { useCreateMessageMutation, useGetUsersQuery } from "@/store/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const messageSchema = z.object({
  recipientId: z.number().optional(),
  subject: z.string().min(1, "Subject is required"),
  content: z.string().min(1, "Message content is required"),
  isBulk: z.boolean(),
});

type MessageFormData = z.infer<typeof messageSchema>;

export default function MessagingPanel() {
  const [isBulkMessage, setIsBulkMessage] = useState(false);

  // const { data: users = [] } = useGetUsersQuery();
  // const [createMessage, { isLoading }] = useCreateMessageMutation();

  const users: any = [];

  const form = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      subject: "",
      content: "",
      isBulk: false,
    },
  });

  const onSubmit = async (data: MessageFormData) => {
    try {
      // await createMessage({
      //   senderId: 1, // Current admin user ID
      //   recipientId: data.isBulk ? undefined : data.recipientId,
      //   subject: data.subject,
      //   content: data.content,
      //   isBulk: data.isBulk,
      // }).unwrap();

      form.reset();
      setIsBulkMessage(false);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {/* Message Composition */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Send size={20} />
            <span>Compose Message</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Bulk Message Toggle */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="bulk-message"
                  checked={isBulkMessage}
                  onCheckedChange={(checked) => {
                    setIsBulkMessage(checked);
                    form.setValue("isBulk", checked);
                    if (checked) {
                      form.setValue("recipientId", undefined);
                    }
                  }}
                />
                <Label
                  htmlFor="bulk-message"
                  className="flex items-center space-x-2"
                >
                  <Users size={16} />
                  <span>Send to all users</span>
                </Label>
              </div>

              {/* Recipient Selection */}
              {!isBulkMessage && (
                <FormField
                  control={form.control}
                  name="recipientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <User size={16} />
                        <span>Recipient</span>
                      </FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a user" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {users.map((user: any) => (
                            <SelectItem
                              key={user.id}
                              value={user.id.toString()}
                            >
                              {user.fullName} ({user.email})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Subject */}
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter message subject" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Message Content */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter your message here..."
                        rows={6}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                {false
                  ? "Sending..."
                  : `Send ${isBulkMessage ? "Bulk " : ""}Message`}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Message Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Message Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-2">
                To: {isBulkMessage ? "All Users" : "Selected User"}
              </div>
              <div className="font-semibold mb-2">
                {form.watch("subject") || "Subject will appear here"}
              </div>
              <div className="text-sm whitespace-pre-wrap">
                {form.watch("content") || "Message content will appear here"}
              </div>
            </div>

            {isBulkMessage && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>Warning:</strong> This message will be sent to{" "}
                  {users.length} users. Please review carefully before sending.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
